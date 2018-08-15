# Benchmarks

Results may slightly vary across Node.js runtimes. All tests run on a 2.4GHz Intel Core i7 CPU with 16 GB memory.

## Run

```
npm i && node .
```

<pre>
# Load Time
mri: 0.738ms
yargs: 2.110ms
<b>getopts: 0.596ms</b>
minimist: 0.734ms

# Parse Time
mri × 378,898 ops/sec
yargs × 32,993 ops/sec
<b>getopts × 1,290,267 ops/sec</b>
minimist × 289,048 ops/sec
</pre>
