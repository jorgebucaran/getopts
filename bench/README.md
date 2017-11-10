# Benchmarks

[Getopts](../README.md) vs. [mri](https://github.com/lukeed/mri), [yargs](https://github.com/yargs/yargs) and [minimist](https://github.com/substack/minimist) benchmark results.

## Run

```
npm i && node .
```

## Results

Please be aware that results may slightly vary across Node.js runtimes. All tests run on a 2.4GHz Intel Core i7 CPU with 16 GB memory.

<pre>
mri × 3,616 ops/sec
yargs × 859 ops/sec
<b>getopts × 1,156,041 ops/sec</b>
minimist × 829 ops/sec
Fastest is getopts
</pre>
