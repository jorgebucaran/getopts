# Benchmarks

[Getopts](../README.md) vs. [minimist](https://github.com/substack/minimist), [yargs](https://github.com/yargs/yargs) & [mri](https://github.com/lukeed/mri) benchmark results.

## Run

```
npm i && node .
```

## Results

Please be aware that results may vary across browsers and Node.js runtimes. All results run on a 2.4GHz Intel Core i7 CPU with 16 GB memory.

<pre>
mri x 3,909 ops/sec ±36.27% (11 runs sampled)
yargs x 26,532 ops/sec ±0.92% (87 runs sampled)
getopts x <b>655,463 ops/sec</b> ±1.46% (90 runs sampled)
minimist x 784 ops/sec ±1.71% (89 runs sampled)
<b>Fastest is getopts</b>
</pre>


