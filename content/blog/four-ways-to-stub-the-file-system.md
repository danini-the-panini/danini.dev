---
title: Four ways to stub the file system
publishedAt: 2015-05-01
tags:  ["ruby", "tdd"]
---
# Four ways to stub the file system

From time to time I find myself needing to test some method that deals with the file system. It's a tricky business, and there are a number of ways to go about it. Here, I'll go through a few I've looked at in the past and sum up how I feel about them.

## 1. Stubbing the File System

As with any interaction with the outside world, one would naturally just stub the whole thing out, or at least the bits of it that you use.

Given this method:

```ruby
def write_to_some_file data
  File.write('some_file', data)
end
```

Here's how you might test it:

```ruby
describe '#write_to_some_file' do
  it 'writes a file' do
    File.stub(:write)

    expect(File).to receive(:write).with('some_file', 'Hello World')

    write_to_some_file 'Hello World'
  end
end
```

While this works, it involves stubbing out _every_ method, in your language's file system library, that you plan on using. You may also notice that if your implementation of `write_to_some_file` changes to use `File.open` instead, you'll have to change the test to match the new implementation. This isn't conducive to good TDD practice.

## 2. Using a Library
To get around the problem of stubbing each and every file system method that you use in your code, why not use a library that does that for you? In Ruby, the [fakefs](https://github.com/defunkt/fakefs) gem does just that. It stubs out the entire file system and gives you a virtual one without ever touching the real file system. Here's how you would use it with RSpec to test the same method:

```ruby
require 'fakefs/spec_helpers'

describe '#write_to_some_file' do
  include FakeFS::SpecHelpers

  it 'writes a file' do
    write_to_some_file 'Hello World'

    expect(File.read('some_file')).to eq 'Hello World'
  end
end
```

Now, the spec only cares about the outcome and not how it was done. Plus, you didn't have to stub out everything yourself.

Still, there can be problems with this approach. While fakefs is rather inclusive, it does not necessarily work with external libraries that deal with the file system in their own way. It also won't work if you're calling a system command like `mkdir`, as fakefs has no control over that situation.

Another thing to remember when stubbing out the entire file system is that you are **stubbing out the entire file system**. That means all the files and directories you expect your methods-under-test to be able to read and write to **are not there anymore**. This bit me when I tried to test a method that reads an ERB from a known location within the gem, and write the result to the current directory. After including fakefs, it dawned on me that the ERB I wanted the method to load no longer "existed".

## 3. Injecting StringIO

Dependency injection is a boon to tests. With that said, why not inject the "file system" into your method? Doing this is easier than you think, and I've used this in the past when testing my [tag_remover](https://github.com/danini-the-panini/tag_remover) gem. Basically, all you have to do is write your method to take IO streams instead of file paths. Then in production, you can give it a File object, and in your test you can "stub" out the file with an instance of `StringIO`, which acts almost exactly the same as a file stream. Here's how you might implement the method to support dependency injection:

``` ruby
def write_to_some_file(file, data)
  file.write data
end
```

And here is how you can test it with StringIO:

``` ruby
describe '#write_to_some_file' do
  it 'writes a file' do
    fake_file = StringIO.new

    write_to_some_file(fake_file, 'Hello World')

    expect(fake_file.string).to eq 'Hello World'
  end
end
```

This way, you don't have to stub out any of the file system, and you get to test your method without actually writing to any files. Neat!

Of course, this only works in certain cases. Specifically when you're dealing with only reading and writing to streams. For example, you can't really test that a file got deleted using this approach. But still, `StringIO` makes for a great stubbed-out file when you can use it.

## 4. Just Don't

Now just think to yourself, _just why are you stubbing out the file system in the first place?_ There isn't anything particularly _wrong_ with the file system, and every test environment will most certainly have one. With this in mind I don't see any reason not to just do your business in an actual directory and clean up afterwards. This is the approach I use in [rpluplus](https://github.com/danini-the-panini/rplusplus) and in one of my work projects.

Basically, all you have to do is something like this in your test suite:

```ruby
SANDBOX_DIR = 'spec/support/sandbox'

before do
  @old_pwd = Dir.pwd
  FileUtils.mkdir_p(SANDBOX_DIR)
  Dir.chdir(SANDBOX_DIR)
end

after do
  Dir.chdir(@old_pwd)
  FileUtils.rm_rf(SANDBOX_DIR)
end
```

And then continue to test the original method as per usual:

```ruby
describe '#write_to_some_file' do
  it 'writes a file' do
    write_to_some_file 'Hello World'

    expect(File.read('some_file')).to eq 'Hello World'
  end
end
```

This approach gives you a similar feel to a "virtual file system" without having to stub anything out. Your specs can test the outcome of the method without worrying about implementation details, and your methods themselves can still access the rest of your project's files.
