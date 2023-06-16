---
title: When Angulars Attack!!!
publishedAt: 2016-05-26
tags: ["angularjs", "javascript"]
---
# When Angulars Attack!!!

Angular Attack 2016 Post Mortem

(This is an opinion-based article an in no way reflects the views of Platform45)

## Introduction

This weekend, a few colleagues and I got together and participated in the first annual Angular Attack, a 48 virtual programming competition, in which we built an app using Angular 2.0. Our app, "espy", is a status board with the aim of aggregating data over multiple software development projects and displaying it on a screen with shiny graphs. We got pretty far with our app, and I'm personally very impressed with what the team managed to achieve in such a short amount of time using a brand new framework that none of us had really had much experience in.

## What Went Right

Our designer built mockups in Illustrator, and we replicated them in HTML/CSS almost perfectly. If it weren't for the mockups, espy would have gone in a million different directions and ended up looking like a four-year-old's abstract artwork. Design-Driven-Development is the way to go.

We had to continuously prioritise and plan our steps ahead in micro-standups every few hours, to make sure we weren't going off on a tangent. With such a tiny amount of time, keeping the team focussed is of utmost importance. By continuously prioritising and re-evaluating our progress, we managed to get as many of the app's most important features up, running, and polished before the clock stuck 00:00:00 UTC.

`{{ doThing }} early, {{ doThing }} often` is a common saying in any software development situation. Branch, commit, deploy, experiment as often as you can right off the bat. One of the keys to a successful hackathon like this is to make sure that you have a working version of your app ready for submission *at all times*, in case you run out of time half-way between a new feature (which happened to us) you have your best, working, presentable work available to hand over to the judges.

The Angular Attack rules don't explicitly forbid the use of paid services, but they do strongly recommend building your app for freely accessible services to make things easier for the judges and for public viewers. While we debated OAuth'ing with Trello and Github, we ended up dropping auth altogether and pulling all our demo data from public boards/repos. We saved the time we would have spent building the logins, and we made sure that the app was instantly demo-able.

## What didn't go so right

I just need to put this out here in the open: Just about the only thing Angular 1.x and Angular 2.0 have in common is the name. Despite the rumours of a gradual upgrade path, the jump is still a colossal one. The syntax of pretty much *everything* is *completely different*. We had to unlearn all our collective years of experience in Angular 1.x in the space of two days.

The team unanimously voted TypeScript out of the window. None of us had ever used it, and we were all comfortable enough with ES5, so we went down that road. Angular 2.0 supports it, after all. Little did we know that, while it is technically supported, the ES5 equivalents of all the TypeScript things are completely undocumented. Even the stackoverflow posts are 99.99% TypeScript. And, of course, every third-party library out there is written completely for TypeScript, and ES5 support for them is all but missing. We got bitten by this when we tried to use ng2-charts, an Angular 2.0 wrapper for Chart.js. After an hour of trying to wangle the thing into ES5 we ended up just writing our own Chart.js wrapper. Looking ahead, if you want to be able to use documentation and 3rd-party libraries and not pull your hair out, you'll probably want to build your Angular 2.0 app in TypeScript, but you already knew that, didn't you.

One of the **huge** changes from Angular 1.x is the replacement of Promises with Reactive Programming. Gone is `$q`, you must now face the wrath of `RxJS`, a JavaScript implementation of ReactiveX. Now promises were confusing enough already, and it had taken us a few months of Angular 1.0 development before they really "clicked". RxJS, on the other hand, is on a completely different planet. Again, we had to unlearn what we knew about Promises and try hammer Rx into submission. Oh, and to make matters worse, RxJS had just been **re-written from scratch for Angular 2.0 and released as version 5**, so nearly every single piece of information about RxJS we read was for version 4.0 and therefore irrelevant and consequently useless.

On an amusing note, we were constantly blocked by GitHub's rate limiting. Since we decided that adding authentication wasn't necessary for the competition, we were at the mercy of GitHub's very strict rate limiting for unauthenticated requests. In order to get around it, we had to change our IP address every 30 minutes or so by cycling through every member's wireless hotspots on their phones and/or iPads. In retrospect, we could have added a very simple authentication method to get around it in about 10 minutes.

## What we have learned

We had a lot of fun this weekend, and we built an impressive little app considering all the challenges we had to face. Personally, this has been by far the most successful 48-hour hackathon I've ever participated in, being the first one where the team actually delivered a working piece of software.

If I've learnt anything from this weekend, it's that Angular isn't Angular anymore. I won't go so far as to say it's a lost cause, but rather point out that it simply doesn't cater to the same market as Angular 1.x. Despite the label, it's not a Google product anymore. With TypeScript and RxJS, it's clear that Microsoft has more involvement in its development than the big G.

Anyway, good luck with your future with "Angular 2.0", or should I rather say "Microsoft SPA.NET Enterprise 2016".


See our entry [here](https://p45jhb.2016.angularattack.io/)
