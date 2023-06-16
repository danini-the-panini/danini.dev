---
title: Rebuilding my blog with Rails 5
publishedAt: 2016-03-30
tags: ["ruby", "rails", "meta"]
---
# Rebuilding my blog with Rails 5

The Whys and Woes.

## The Whys

There has to be a reason (or multiple) why I decided to abandon my previous, _working_, blogging platform ([Octopress](http://octopress.org/)) for a custom, built-from-scratch one.

### Why not?

What self-respecting software developer doesn't build their own blogging platform using their favourite technologies?

Of course there are plenty of great blogging platforms for developers out there. Octopress is a wonderful developer-friendly blogging platform, built on [Jekyll](https://jekyllrb.com/), that uses git for posting new articles and serves them up with Sinatra. However, there is a _certain something_ about making your very own blog. Namely, _it's yours._

> This is my blog. There are many like it, but this one is mine.

### Ease of use

To post a new article in Octopress, you run a rake task to create a blank markdown file, write the content, and then push to Heroku (or wherever). Simple enough. However, every time I settled down to write a blog post, I'd forget what rake task to run and how to spin up the local server to test it. This led me to have to go through Octopress's guides all over again before writing a new post, which in turn made me less interested in blogging, causing me to blog less - this in turn, resulted in forgetting how to write a new post all over again, etc.

This may seem silly, but as much as I am a developer, I'm also a human being. I'm a sucker for hassle-free UX that doesn't get in the way. Especially not in the way of what is supposed to be free-flowing thoughts that I can just write down and dump on the internet. I want a good, old-fashioned HTML form with a "Publish" button.

### Customisability

Now, Octopress is great. It's simple. It's customisable. You can add pages, themes, etc. It's just a ruby app with a bunch of gems so you can just as easily open it up and change whatever you want.

I didn't want to do that. It's somebody else's strange code and I didn't feel like diving in, reading and understanding what went through the whole thing.

Okay! I was too lazy.

Obviously _not_ too lazy to go ahead and rewrite everything from scratch. Don't worry, I've got more (not to mention, better) reasons than that, so keep reading.

### Learning

I love learning new things. I feel like I haven't learnt much new tech over the past year (been doing node.js almost exclusively for a year and a half now), and I really wanted to sink my teeth into something fresh. Rebuilding my blog seemed like the perfect opportunity.

Ruby on Rails 5 Beta 3 had just arrived at the station and I figured it was about time I got on board. And since I'd been on the node.js express, I hadn't touched Rails in a while and I wanted to switch trains for a bit.

Locomotive-related puns aside, I had also recently come into contact with [Polymer](https://www.polymer-project.org) - the Web Component library from Google - with all its cool, material-design components. I wanted all that cool stuff. As you can probably tell (if you're not in the far future where I've redesigned my blog again), I've got that whole Material Design thing going on all over. As you may also have noticed (if you're a curious developer and opened your dev tools), I am _not_ using Polymer. More on that in "The Woes" section later.

## The Woes

I'm building my new blog on a pre-release framework, a relatively new and poly-filled web standard, and a component library built primarily for offline or single-page apps. What could _possibly_ go wrong?

### Polymer, meet Rails (gtfo Turbolinks, nobody likes you)

I must say, Polymer is way cool. You've got these Paper Elements that make HTML forms seem like something out of ~~IE6~~ the 90s. I made a _slidey_ menu just by adding one or two tags. I threw in a Floating Action Button just because I could. I had a snappy, good-looking, semi-responsive website going on with zero JavaScript, minimal CSS, and a less than average amount of markup.

Then I clicked a link, and shit started falling apart. I immediately knew who the culprit was, and my heart sank.

> Dammit, Turbolinks, why you gotta be so rude?

Apparently the infamous website-make-fasterer isn't a big fan of Web Components and HTML import tags just yet. I didn't bother trying to fix it. I'd been down this road before, and I didn't want to waste countless hours debugging it.

> Turbolinks, I'm sorry, but I'm hanging out with Polymer these days and I don't need you coming in and making things awkward between us.

### Say goodbye, Polymer (lol jk Turbolinks, come back)

Well, that didn't last long. Summer lovin' and all that.

Look, there's nothing inherently wrong with Polymer. It's just, I don't think we're ready for this kind of commitment yet. I think Web Components are definitely the future, but I'm living in the present with everybody else.

My blog was looking perfectly fantastic in Chrome. Polymer was doing its thing and we were all happy. Then I opened it up in Firefox and I saw it. My whole site flashed before my eyes in one gelatinous blob of un-styled text before hastily rearranging itself into the proper form. Almost as if Firefox was handed this pile of new-fangled web components and thought "Oh Crap, what do I do with this? Let me just throw it on the screen for now while I figure this out" before quickly piecing it together and then whistling nonchalantly, hoping you don't walk up and question it's incompetence.

To my utter dismay, Safari had the same reaction. I did some quick Googling and found some guys on Stack Exchange with a solution to blank out the screen until the components were ready to be drawn. But I didn't bother. I had already made my decision. I wanted my blog to be there when I needed it. I didn't want it to get dressed behind a loading screen while someone waits an extra 500ms for it to get get on the runway. And Google PageSpeed Insights had already given me the thumbs-down on mobile performance.

So Polymer had to go. For now. In the meantime, I did everything the old-fashioned way with hand-crafted SASS mimicking the material design look you see today. I also got the added benefit of letting my ~~ex-lover~~ frenemy Turbolinks back into the circle, also in the hopes that its fancy new version number means we'll get along better this time.

### Hi 5! Too slow :(

My Google PageSpeed Insights score was still not good enough. "Too much blocking the view" Google told me bluntly. I had to do better. I had to _be_ better. I asked the great Oracle, Google itself, for answers. It told me to inline my CSS.

Was this a test? "Inline my CSS"? That can't be right. I've been told by every respectable web developer out there that inline CSS is the worst thing you can do, and anyone who does it should probably be fired on the spot, or at least be brought in for a disciplinary meeting. _Surely_ Google must be on crack, or they're so concerned about performance that they don't give a crap about every other good thing under the sun.

I visited Stack Overflow for a stiff drink and perhaps some enlightenment from my fellow developers. I found most of them just as bewildered as I, asking for free tools that could inline their CSS automatically. It seems Google's simple PageSpeed Insights suggestions had caused _quite_ a stir in the community.

And then I realised that what they meant by "inline" was actually `<style>` tags, and not `style="..."` attributes, and I let out a huge sigh of relief. What was I thinking? Of course Google wouldn't suggest such a heinous act.

The basic idea is this. When your page comes over the wire, it parses the `<head>`, finds your `<link>` tags, downloads the CSS, and then renders the page with your styles. The problem here is that the browser is showing the user a pretty blank screen while it loads _all the styles in your whole app_ (because sprockets and stuff).

[Google's suggestion](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery) is to put a small collection of critical CSS rules directly in a `<style>` tag, and then use some funky JavaScript to load the rest of the CSS asynchronously. That way, your users can actually see the page sooner, and all your fancy-schmancy CSS like shadows and hover animations can come later.

There's a whole bunch more cool optimisations like this that you can do to ramp up that initial page load performance, but thats for another article. For now, check out [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/), and listen to the [ZADevChat Episode with Mannuel Ferreira](https://soundcloud.com/zadevchat/episode-33-web-frontend-performance-with-mannuel-ferreira).

### Turbolinks, y u do dis?

This shit with Turbolinks just doesn't go away, does it? Yes, we're working through our issues, but stuff like this takes time. All I want to do is add Google Analytics to my blog, and there you go stomping all over it like it means nothing. And here I thought you cared about me.

Maybe I'm being a bit harsh. I get it, you have needs. `DOMContentLoaded` isn't good enough for you, I need to listen to your `turbolinks:load` events. Okay, I must say your use of `window.history` is attractive. I think this can work.

And then you go and stomp all over my social media buttons! Seriously, Turbolinks, wtf? So what, they're async-loaded into tiny iframes, I need them for like exposure and stuff. Why you gotta roll your eyes at me, pass passive aggressive comments and withhold ~~the sexy times~~ features every time I do something "different"?

### The Phantom of the ~~Opera~~ WebKit

Obsessed with page load performance, I planned an elaborate trick. You see my index page? The one with all the posts lined up, `min-width`'d with a gradient on top? Initially, I had the whole blog post load underneath that, and I just `overflow: hidden`'d it all away. It did the job. But I knew there was no point sending the whole post over the wire if nobody was going to see it. Something inside me churned as I thought of all that wasted bandwidth.

I devised a plan. I would trim the post content on the server side, exactly as much as needed, so that only the visible elements are downloaded. How, you ask?

I wrote a little piece of JavaScript that takes the full post HTML, and, one at a time, puts each element into a `<div>` attached to the body, and stops as soon as the `clientHeight` of said `<div>` goes over the `min-height`. I pumped that into [PhantomJS](http://phantomjs.org/) and had it spit out the resulting `innerHtml`. The results were incredible. But they weren't _perfect_. Sometimes I saw less of the post than I was supposed to.

Turns out PhantomJS's base page-width is 400px, and you can't change that unless you explicitly spawn a new `webpage` and run your JavaScript inside that. After I _finally_ got that working (there are some technical details about the `page.evaluate` function that make it a little tricky to work with), I had the post-summaries trimmed to ~~perfection~~ _almost_ perfection.

Some posts were now not trimmed enough. At this point I realised I needed to load my CSS _and_ fonts into PhantomJS to make it 100% accurate. In retrospect, I obviously should have anticipated this, but in my mind I subconsciously figured it would be "good enough" and dismissed this fact. It wasn't good enough. I was obsessed, remember?

So now I had a giant mess of JavaScript, in an ERB file, loading a PhantomJS `webpage`, evaluating a script injected with my compiled SASS and the cut-down view of a post summary container, asynchronously loading the fonts, and then performing the original trim-script, using `alert` to signal the outside world that it is done, and "throwing" errors by logging "SOMETHING WENT WRONG".

It's a hack, to say the least, but it works. And it's tested.

## The Rest is History

That is the tale of discovery, disappointment and drama that surrounded my impromptu blog rewrite. I know this wasn't a very technical post, but I hope you enjoyed it. I would like to go into more detail on each of the technologies I experimented with and the problems I faced, but that would be better served with short, focused, individual posts on the subjects.

And remember, kids:

> You won't know unless you succeed.
>
> You won't succeed unless you fail.
>
> You won't fail unless you try.
>
> Ergo lorem ipsum ... you won't know unless you try.

_**Update 24 September 2020:**_ I've since re-built my blog/website using [Nuxt.js](https://nuxtjs.org/). The original Rails version is still availalbe [here](https://github.com/danini-the-panini/sourlemon).
