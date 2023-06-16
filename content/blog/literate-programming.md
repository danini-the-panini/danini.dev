---
title: Literate Programming
publishedAt: 2014-03-26
tags: ["meta"]
---
# Literate Programming

## tl;dr
Check out my literate programming implementation called [WEBdown](https://github.com/danini-the-panini/WEBdown).

## Rant

In my three years of studying computer science, I think Donald Knuth was mentioned by a lecturer approximately once. Seeing as he is one the greatest (if not _the_ greatest) figures in the world of computer science and software engineering today, I find this somewhat sad. He has only really influenced the stundents indirectly through the mandatory use of LaTeX that was introduced in third year and forced from honours level onwards. Still, I hardly think more than a handful of us even know the origins of LaTeX. Most of the students actively despise it, preferring to use Microsoft Word or Adobe InDesign, for which they are punished. Anyways this post isn't a rant about LaTeX, but rather about something far less known and far more interesting (in my opinion). It's about something I stumbled upon last week called Literate Programming.

"What is Literate Programming?" I would imagine most people would be asking at this point. If you are asking this question, I urge you to read the [original paper by Knuth](http://www.literateprogramming.com/knuthweb.pdf), as he explains it very well. Literate programming is a radical development methodology in which instead of writing all your code in source files, you write a book about your program. In that book are snippets of code that, when put together in the correct order, compiles into your program. The end result is the perfect document describing the program, as well as all the code for the program, all in one place.

Most people these days who have heard of Literate Programming (LP) tend to believe that technologies like doxygen and javadocs are the 'modern day' incarnation of LP. These people are horribly misinformed. There is a huge, key difference between comment-based documentation and LP. In a typical literate program, the code is not necessarily in the order that it would be if it were in a standalone source file. Instead, the source code is presented in a "natural" order, or, as Knuth puts it, a "stream of conciousness." As a book, your program's code is defined in the order you describe it. The advantages are incredible. This allows you to focus on the important or fundamental pieces of your project first, and then put boring stuff like boilerplate code or pre-processed look-up-tables in the apendices. Each of your code snippets have a name and are placed in the index. Referenced snippets are easy to find since they include the number of the chapter or section in which they were defined. Electronic representations of LP can also use hyperlinks to make navigation of the code incredibly easy. You could even write a blog post that is actually a literate program. The possibilities are endless. [This guy](http://youtu.be/Av0PQDVTP4A) gets some solid points across regarding LP and advocates its use in industry.

So after ranting about LP, I present to you a small project I worked on this afternoon: a small, 'modern' implementation of LP based on Markdown. I call it [WEBdown](https://github.com/danini-the-panini/WEBdown).
