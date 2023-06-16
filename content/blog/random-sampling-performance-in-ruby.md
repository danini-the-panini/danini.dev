---
title: Random Sampling Performance in Ruby
publishedAt: 2015-03-01
tags: ["ruby", "benchmark"]
---
# Random Sampling Performance in Ruby

Ruby has a couple of random selection functions, including `Kernel::rand`, `Array#sample`, and `Array#shuffle`. I thought I'd compare their performance, for interest's sake.

The `rand` function by default returns a randomly-generated floating point number between 0.0 and 1.0. The `Array#sample` method returns a random element from the array it is called on. The `Array#shuffle` method shuffles the array's contents and is notoriously slow for random selection purposes. I'm throwing it in here just to demonstrate how slow it actually performs.

The proposed methods being benchmarked are

1.  Good old rand: `(rand * (N-M)).to_i + M`
1.  Rand with integer: `rand(N-M) + M`
1.  Rand with range: `rand(M...N)`
1.  Sample from range: `(M...N).to_a.sample`
1.  Sample from array: `a = (M...N).to_a` ... `a.sample`
1.  Shuffle and first: `a = (M...N).to_a` ... `a.shuffle.first`

To compare each of these methods I used the gem [benchmark-ips](https://github.com/evanphx/benchmark-ips). It's a really great gem that gives you benchmark result in iterations per second (ips).

Experiment
----------
This is the code I used to benchmark:

```ruby
require 'benchmark/ips'

array1 = (M...N).to_a
array2 = (M...N).to_a

Benchmark.ips do |x|
  x.report('rand') { (rand * (N-M)).to_i + M }
  x.report('rand-with-integer') { rand(N-M) + M }
  x.report('rand-with-range') { rand(M...N) }
  x.report('range-sample') { (M...N).to_a.sample }
  x.report('array-sample') { array1.sample }
  x.report('shuffle-and-first') { array2.shuffle.first }
  x.compare!
end
```

Results
-------
And here are the results, running on MRI 2.2.0.

For M, N = 100, 200:

```
Calculating -------------------------------------
                rand   101.008k i/100ms
   rand-with-integer   102.306k i/100ms
     rand-with-range    93.654k i/100ms
        range-sample    17.368k i/100ms
        array-sample   127.396k i/100ms
   shuffle-and-first    30.846k i/100ms
-------------------------------------------------
                rand      5.396M (± 2.3%) i/s -     26.969M
   rand-with-integer      4.218M (± 2.6%) i/s -     21.075M
     rand-with-range      3.186M (± 0.9%) i/s -     16.015M
        range-sample    208.278k (± 1.5%) i/s -      1.042M
        array-sample      7.000M (± 1.3%) i/s -     35.034M
   shuffle-and-first    385.857k (± 1.8%) i/s -      1.943M

Comparison:
        array-sample:  7000149.5 i/s
                rand:  5396360.1 i/s - 1.30x slower
   rand-with-integer:  4218324.8 i/s - 1.66x slower
     rand-with-range:  3185872.3 i/s - 2.20x slower
   shuffle-and-first:   385856.9 i/s - 18.14x slower
        range-sample:   208278.3 i/s - 33.61x slower
```

For M, N = -1000000, 1000000 (that's a million, folks):

```
Calculating -------------------------------------
                rand   100.736k i/100ms
   rand-with-integer   101.204k i/100ms
     rand-with-range    88.602k i/100ms
        range-sample     1.000  i/100ms
        array-sample   110.195k i/100ms
   shuffle-and-first     1.000  i/100ms
-------------------------------------------------
                rand      5.069M (± 2.1%) i/s -     25.385M
   rand-with-integer      4.270M (± 2.5%) i/s -     21.354M
     rand-with-range      3.207M (± 1.6%) i/s -     16.037M
        range-sample     14.704  (± 0.0%) i/s -     74.000
        array-sample      5.400M (± 3.7%) i/s -     26.998M
   shuffle-and-first     13.142  (± 0.0%) i/s -     66.000

Comparison:
        array-sample:  5400288.4 i/s
                rand:  5068905.6 i/s - 1.07x slower
   rand-with-integer:  4269661.1 i/s - 1.26x slower
     rand-with-range:  3207159.2 i/s - 1.68x slower
        range-sample:       14.7 i/s - 367270.31x slower
   shuffle-and-first:       13.1 i/s - 410930.02x slower
```

Conclusion
----------
Interestingly enough, sampling from an array is significantly faster than any of the rand methods for small (M,N). However, for larger ranges the performance gap becomes less apparent. I wanted to try with (-1000000000, 1000000000) (thats a billion, btw) but it took too long to allocate the arrays, lol. IPS for the rand methods don't seem to change much based on the range size. And, as expected, range-sample and shuffle-and-first methods perform terribly in pretty much any situation.

So, to wrap it up: `Array#sample` is relatively fast for small-ish N, but that doesn't count the array's allocation time. The good old `Kernel::rand` functions are consistently performant, and work great for large ranges of integers. And lastly, which is something I hope every ruby developer knows by now, `Array#shuffle` followed by `Array#first` is a terrible thing to do, and is a firable offence.
