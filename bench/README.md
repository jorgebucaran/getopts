# Benchmarks

[Getopts](../README.md) vs. [mri](https://github.com/lukeed/mri), [yargs](https://github.com/yargs/yargs) and [minimist](https://github.com/substack/minimist) benchmark results.

## Run

```
npm i && node .
```

## Results

Results may slightly vary across Node.js runtimes. All tests run on a 2.4GHz Intel Core i7 CPU with 16 GB memory.

<pre>
mri × 374,999 ops/sec
yargs × 32,370 ops/sec
<b>getopts × 1,495,165 ops/sec</b>
minimist × 283,031 ops/sec
</pre>
