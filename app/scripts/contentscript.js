// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

const IdentiAddress = require("./IdentiAddress");
const ident = new IdentiAddress();

let parseLinks = function() {
    var links = Array.from(document.links);
    links = Array.from(document.body.getElementsByTagName("*")).concat(links);
    console.log(links);

    var re = /^(0x)?[0-9a-zA-Z]{64}|^(0x)?[0-9a-zA-Z]{40}/g;
    var m;
    for (const a of links) {
        let inner = a.innerHTML;
        if (inner.indexOf("<") > -1) continue;
        console.log(a.innerHTML);
        if (a.textContent.match(re)) {
            console.log("poep");
            inner = inner.replace(
                a.textContent.match(re)["0"],
                ident.formatAddressBottomBorder(a.textContent.match(re)["0"]),
            );
            a.innerHTML = inner;
        }
    }
};

function r(f) {
    /in/.test(document.readyState) ? setTimeout(r, 9, f) : f();
}
r(function() {
    parseLinks();
});

parseLinks();
