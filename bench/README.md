# Benchmarks

[Getopts](../README.md) vs. [minimist](https://github.com/substack/minimist), [yargs](https://github.com/yargs/yargs) and [mri](https://github.com/lukeed/mri) benchmark results.

## Run

```
npm i && node .
```

## Results

Please be aware that results may slightly vary across Node.js runtimes. All tests run on a 2.4GHz Intel Core i7 CPU with 16 GB memory.

<pre>
mri × 3,927 ops/sec
yargs × 717 ops/sec
<b>getopts × 1,049,191 ops/sec</b>
minimist × 679 ops/sec
<b>Fastest is getopts</b>
</pre>
