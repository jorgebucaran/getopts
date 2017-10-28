# Benchmarks

[Getopts](../README.md) vs. [mri](https://github.com/lukeed/mri), [yargs](https://github.com/yargs/yargs) and [minimist](https://github.com/substack/minimist) benchmark results.

## Run

```
npm i && node .
```

## Results

Please be aware that results may slightly vary across Node.js runtimes. All tests run on a 2.4GHz Intel Core i7 CPU with 16 GB memory.

<pre>
mri × 3,848 ops/sec
yargs × 763 ops/sec
<b>getopts × 935,464 ops/sec</b>
minimist × 816 ops/sec
Fastest is getopts
</pre>
