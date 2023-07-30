---
title: Mandelbrot, Workers, WASM and WebGPU
publishedAt: 2023-07-01
tags: ["javascript", "typescript", "webworkers", "wasm", "webgpu"]
---
# Mandelbrot, Workers, WASM and WebGPU

A look into a few ways to do computation in the browser.

## History

I meant to write this article over three years ago. It emerged while I was writing my [last post](/blog/rails-typescript-and-stimulus). The idea was to see how well webpacker handled WebWorkers, WASM, and the two combined. I had already even written a whole post on it. But the world went pear-shaped, I forgot about it, and the laptop I had my draft on was no longer in my posession.

Fast-forward to today: Webpack has fallen out of fashion, there are far better and faster bundlers, they have fantastic first-party support for both WASM and Workers, and the browser support tables have a lot more green checks on them. So this is less of an if/how to do it, since that part is easy now, and more of a why and which one to choose.

And as a bonus we now have an up-and-coming contender on the block: WebGPU.

## Upgrades, people

- yeet rails
- s/webpack/vite/g

## Vanilla JS

- slow
- blocks the whole page
- works everywhere
- terrible don't do it

## WASM

- can be nerfed or disabled by browser security settings
- SIMD provides ~2x speedup in chromium
- runs about as fast as native C in Firefox

## Worker

- embarassingly parallel

## WASM Worker

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
