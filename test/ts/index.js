"use strict";
exports.__esModule = true;
var getopts_1 = require("getopts");
console.log(getopts_1["default"](["-s"], {
    alias: {
        s: "super"
    },
    boolean: ["super"],
    "default": {
        "super": true
    }
}));
