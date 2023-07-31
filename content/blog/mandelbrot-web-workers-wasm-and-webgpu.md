---
title: Mandelbrot, Workers, WASM and WebGPU
publishedAt: 2023-07-01
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

- can be nerfed or disabled by browser security settings
- SIMD provides almost 4x speedup
- runs about as fast as native C in Firefox

## WASM + WebWorkers

- wasm+simd+workers=immensly fast

## WebGL

- real-time performance
- works pretty much everywhere

## WebGPU

- real-time performance
- code is nicer than WebGL, especially WGSL
- doesn't work everywhere yet
- still beta, firefox nightly crashed a lot

## Conclusion?

- workers are great, not just for parallel but also for non-blocking compute
- wasm is great, lets you use C/rust libraries, and low-level CPU features like SIMD
- webgl if your use-case maps well to fragment shaders
- webgpu looks promising but still early days
- just whatever you do dont run heavy compute on the main thread!

## Sources

- WebGPU: https://github.com/BenjaminAster/WebGPU-Mandelbrot
- SIMD: https://github.com/skeeto/mandel-simd
