---
title: QR That!
publishedAt: 2014-02-28
tags: ["ruby", "sinatra", "heroku"]
---
# QR That!

The first webapp that I shall consider "completed", is this silly little thing that uses antiquated technology to do something for which there are already much better and more useful applications. The antiquated technology I am referring to is the ever-present QR Code. The something I'm doing with it is providing a means to easily transfer URLs from your computer to your phone. The app I created is called [QR This!](http://qr-this.herokuapp.com)

Since I recently switched from Chrome to Safari (since the new Safari is less memory intensive), I found myself unable to simply access my tabs from my Android phone. This is quite a feature loss, and might just pull me back to using Chrome, but for now I needed some way of getting URLs accross without typing the whole thing in again or emailing them to myself. At the time Googling "Online QR code generator" got me websites that allowed me to insert any text and convert it into a QR code, which i could then snap with my phone's built-in scanner.

Now it's all very well copying and pasting URLs, but I figured it could be simpler. I had just come into contact with a really awesome service called [Kimono](http://www.kimonolabs) that uses a nifty trick to allow "Kimonifying" any webpage using a bookmark dragged into the browser's favourites bar. I thought this was a pretty cool idea so I grabbed the little javascript-ish bookmark and modified the URL to direct to my own QR Code generator site.

Putting it all together, I used [qrcode.js](https://davidshimjs.github.io/grcodejs) to do the meaty bits, slapped together a couple of pages in [slim](http://slim-lang.com), dropped them in a [sinatra](http://sinatrarb.com) app and hosted it all on [heroku](http://heroku.com). Pretty easy. Would have taken me fifteen but my environment freaked out a bit regarding the version of [tilt](https://github.com/rtomayko/tilt) that sinatra requires, so the whole process took me a whole afternoon. Anyway it was a fun experience.
