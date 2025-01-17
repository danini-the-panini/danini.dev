---
title: Ruby Endless Methods and the Case Against Macros
publishedAt: 2025-01-16
tags: ["ruby"]
---
# Ruby Endless Methods and the Case Against Macros

I despise macros, and generally any sort of meta-programming that dynamically defines methods. These include things like `alias_method` and `delegate`.

My main reason for this is it makes it somewhat difficult to see where methods are being defined, especially in large projects. While Ruby LSP does seem to support the common cases, it doesn't seem to pick things up 100% of the time.

In my years as a Ruby dev, I've generally used a project-wide search for `def some_method` to find a method definition. Using things like `delegate` makes this method fail on numerous occasions. Sometimes I can grep `:some_method` to find such cases, although it does sometimes find other uses of the symbol that aren't used in macros. Additionally, it won't find the method if `prefix: true` is used.

Since Ruby 3.0, we now have "Endless Methods". These are one-line methods that don't have an `end` keyword, but rather separate definition from body with a single `=`.

```ruby
def foo = "foo"
```

This new syntax opens up a new way to define delegated methods succinctly without the use of macros. Take the following example:

```ruby
class Foo
  attr_reader :bar

  delegate \
    :some_method,
    :some_other_method
    to: :bar

  def initialize(bar)
    @bar = bar
  end
end
```

This can now be written using endless methods:

```ruby
class Foo
  attr_reader :bar

  def initialize(bar)
    @bar = bar
  end

  def some_method = bar.some_method
  def some_other_method = bar.some_other_method
end
```

While this does take a little more typing, as well as repeating the method name, I personally prefer this. Firstly, the methods are now defined with their charactaristic `def` keyword. Secondly, the methods open themselves up for future modification without having to first removal from the delegate macro and subsequent re-definition.

I find the repitition isn't so bad, considering most modern editors support multi-cursor edits, making it trivial to rename the method, or rename the receiver.

Prefixed delegates can receive the same treatment:

```ruby
class Foo
  attr_reader :bar

  def initialize(bar)
    @bar = bar
  end

  def bar_some_method = bar.some_method
  def bar_some_other_method = bar.some_other_method
end
```

This also has the added benefit of allowing subtle differences in method naming, such as making some of the methods unprefixed without declaring them in a separate delegate macro.

Aliases can be achieved similarly. Take the following:

```ruby
class Foo
  def foo
    "foo"
  end
  alias_method :foo, :bar
end
```

With endless methods, this becomes:

```ruby
class Foo
  def foo = "foo"
  def bar = foo
end
```

In this case the `alias` keyword would work just as well (if not better), and I would always prefer using that since it is a built-in keyword and offers better performance than the `alias_method` macro. However, `alias` doesn't always work, especially in cases where the original method is defined in a non-trivial way.

This also allows for slight modifications in behaviour if necessary. For example slightly altering arguments:

```ruby
class Foo
  def foo(arg) = "foo: #{arg}"
  def bar = foo("bar")
end
```

I suspect I'm in the minority with these opinions. My current team overwhelmingly voted against the use of endless methods entirely, let alone using them to replace the use of macros.

Ruby LSP keeps getting better, and is generally making this entire argument null and void. However, I still prefer traditionally defined methods over macros if it can be helped. The slight increase in verbosity is more than made up for in ease of discoverability and general reduction in magic, not to mention reducing the dependency on ActiveSupport.
