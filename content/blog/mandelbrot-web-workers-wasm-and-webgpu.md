---
title: Mandelbrot, Workers, WASM and WebGPU
publishedAt: 2023-12-04
tags: ["javascript", "typescript", "webworkers", "wasm", "webgpu"]
---
# Mandelbrot, Web Workers, WASM, and WebGPU

A look into a few ways to do computation in the browser.

[Demo](https://mandelbrot.danini.dev) | [Source](https://github.com/danini-the-panini/mandelbrot)

## History

I meant to write this article over three years ago. It emerged while I was writing my [last post](/blog/rails-typescript-and-stimulus). The idea was to see how well Webpacker handled WebWorkers, WASM, and the two combined. I had already even written a whole post on it. But the world went pear-shaped, I forgot about it, and the laptop I had my draft on was no longer in my possession.

Fast-forward to today: Webpack has fallen out of fashion, there are far better and faster bundlers with fantastic first-party support for both WASM and Workers, and the browser support tables have a lot more green checks on them. So this is less of an if/how to do it, since that part is easy now, and more of a why and which one to choose.

And as a bonus we now have an up-and-coming contender on the block: WebGPU.

## Upgrades, people

First of all, this is a front-end story, what do we even need rails for? Well, it was for Webpacker, but since we're not using that any more... yeet! Replacing it is [vite](https://vitejs.dev/), since it is fast, modern, chock full of features, and practically works out of the box.

## Mandelbrot

The [Mandelbrot set](https://en.wikipedia.org/wiki/Mandelbrot_set) is a beautiful fractal with a relatively simple mathematical definition. Due to these properties it is a perfect subject for experimenting and comparing different computational techniques. It's quick to write and rewrite in different ways, languages and methods. Its easily recognisable shape makes it easy to spot when things go wrong. Plus you get a pretty picture at the end of it all.

## Vanilla JS

Establishing a baseline is key when performing experiments like this. A sort of compass to make sure we're making good progress and staying on track. In practical terms, this means we can use the baseline to compare visual accuracy of the output, as well as compare performance to see how much and if any improvement was made.

While we're here, it's important to take some notes on the properties of our baseline vanilla implementation. It is written entirely in JavaScript running on the main thread, which is just rubbish for a couple of reasons:

1. Since it is running on one thread, it's quite slow.
2. And since that one thread is the main one, it freezes up the whole page while it runs.

The only things it has going for it is that is relatively simple to implement: loop over some pixels, do some math, draw the pixels. There's no need to worry about memory management, browser support, or weird build setups.

## Web Workers

The first major issue with the vanilla implementation is its synchronous, page-freezing nature. There are two ways to solve this:

1. Slice the work up into tiny chunks that don't take up more than 50ms (anything longer than that is considered a "long task" in the eyes of Chrome's profiler), allowing the main thread's event loop to breathe every so often.
2. Do the work on a separate thread (in JavaScript's case, this is called a Worker)

Option one comes with a major drawback: if you're pausing every 50ms to breathe, the whole process is going to take even longer. Not only that, but unless you're pausing at least every _16ms_ (~60Hz, typical monitor refresh rate), the experience is going to feel janky at best.

Option two allows us not only to offload the work on to a different thread, but also _multiple_ threads. And since computing the Mandelbrot set is one of those [embarrassingly parallel](https://en.wikipedia.org/wiki/Embarrassingly_parallel) tasks, we can slice the image up into roughly equal chunks and send each of them off to a worker.

Except that equally _sized_ chunks don't always represent equal amount of _work_. For example, the values further outside the Mandelbrot set are much faster to compute than the values inside it, so some of our workers are going to finish their work before others and sit idle. Not very efficient.

To maximise efficiency we want all the workers to be working continuously throughout the whole process. We can do this by splitting the work into smaller chunks, and run these in a thread pool. This works like an assembly line, with the chunks being given to any available worker until there are no more chunks. This keeps all the workers constantly busy, if one runs out of work it will be given the next available chunk to work on. Much more efficient.

Now that we've split the work into much smaller chunks, we have a new problem: memory efficiency. If we make each worker allocate the memory for the chunk it is busy working on, then there will be lots of little allocations of each chunk, which results in more overhead. Instead we want to allocate all the memory we need up front, and give that to each worker. SharedArrayBuffer allows us to do just that.

After thread-pooling and shared memory, I think we're about as fast as we can reasonably get with vanilla JavaScript.

## WASM

WebAssembly (WASM) has matured a lot over the years. It is basically a byte-code assembly language for the web. Every major browser now supports pretty much all of its features, and most system languages can target it for compilation.

The use case for WASM is usually to use native libraries, typically written in something like C, in the browser. For example, you might want to use libzip to create zip files without calling a server. Similarly, you might have a desktop application written in a systems programming language, and you want to port it to the web. Most of the code can compile directly to WASM, and all you need to do is provide a user interface, or the UI may even be able to render directly to a canvas or something. Even OpenGL code can be converted to WebGL during the compilation process, allowing native games to be compiled to run in the web with little to no modification.

Another use case for WASM is performance. While normally it is roughly the same as regular JavaScript, since JS has been optimised for decades, it has some features that JavaScript does not, that gives it an edge. The most notable one of those features is something call SIMD, or Single Instruction Multiple Data. SIMD is a set of special CPU instructions that allow you to do multiple calculations in a single instruction, for example, multiply four pairs of numbers at the same time. This can potentially quadruple your performance if you are doing lots of basic arithmetic.

Mandelbrot is a perfect candidate for the use of SIMD, due to its embarrassingly parallel nature. We can easily modify the logic to use SIMD instructions to compute four pixels at a time. This unsurprisingly does result in roughly four times the performance.

In fact, when compared to a similar implementation in C, I found that it ran just as fast in Firefox as it does natively. Native performance in the browser!? What are the downsides?

Unfortunately, even though every major browser now support WASM, and most of its features including SIMD, there is still the issue of security. Browsers will disable WASM under certain circumstances, for example in Microsoft's Edge, it is disabled when the highest security mode is chosen. For this reason, you cannot reliably depend on WASM being able to run for all your users.

## WASM + WebWorkers

Yes, WASM can run in WebWorkers. The only issue is the memory management. While we cannot use SharedArrayBuffer with WASM, we can create contiguous WebAssembly.Memory shared between all WASM workers.

The result is a fourfold performance improvements on top of parallelism. It's fast enough to be almost realtime for low iterations and a fast enough processor.

This is pretty much as fast as it gets for a CPU-only implementation.

## WebGL

For an embarrassingly parallel maths problem such as Mandelbrot, it seems almost idiotic to bother implementing it on the CPU. Indeed, I only did so for comparison, and as an example. Some processing is too complex or doesn't map well to a GPU.

Since Mandelbrot is a 2-dimensional image, it is relatively straightforward to create a naive implementation in GLSL, WebGL's shader language. All we need to do is render a single rectangle the size of the canvas, and do all the calculations in the Fragment shader. The result is orders of magnitude faster than CPU-based implementations, and runs in realtime on all but the highest iteration counts.

On the plus side, WebGL has been implemented in all major browsers for years now, and is rarely disabled for security reasons.

## WebGPU

While WebGL is mature and well supported, it has started to show its age, while desktop graphics libraries have moved on, for example DirectX 12, Vulkan, and Apple's Metal, which offer more features, lower level access to hardware, and improved performance. For this reason, WebGPU began development in order to expose these new interfaces to browsers.

The shader code WGSL is more expressive and readable than GLSL. Debugging is easier with more useful error messages. Performance is comparable to WebGL, although it is difficult to measure such tiny periods of time. It is much easier to calculate average framerate than individual frame times. (TODO: do this pls)

The downside is that, at the time of writing, WebGL is far from complete. Most major browsers have it behind flags, don't support it on all operating systems, or just haven't implemented it at all. For example, I had to install Firefox Nightly to develop for WebGPU, and even then it crashed a lot. Chrome wasn't a piece of cake, either. I had to google for hours to find out the right incantation to get it to run WebGPU in linux. If you're on Windows, however, Chrome supports it out of the box.

Hopefully in the near future it will be as widely supported as WASM.

## Conclusion?

- workers are great, not just for parallel but also for non-blocking compute
- wasm is great, lets you use C/rust libraries, and low-level CPU features like SIMD
- webgl if your use-case maps well to fragment shaders
- webgpu looks promising but still early days
- just whatever you do dont run heavy compute on the main thread!

## Sources

- WebGPU: https://github.com/BenjaminAster/WebGPU-Mandelbrot
- SIMD: https://github.com/skeeto/mandel-simd
