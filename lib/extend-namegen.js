const NameGen = require("./namegen");
//s, v, V, c, B, C, i, m, M, D, and d
Object.assign(NameGen.symbols,{
    k:require("./css-colors"),
    P:require("./adjectives"),
    Q:require("./animals"),
    G:require("./gamer-girl-names"),
    x:require("./gamer-girl-name-presets"),
    b:require("./gamer-boy-names"),
    y:require("./gamer-boy-name-presets"),
    j:require("./gamer-boy-name-japanese-presets"),
    n:require("./gamer-neutral-names"),
    a:require("./nickname-boy-presets"),
    w:require("./nickname-girl-presets"),
});

module.exports ={}