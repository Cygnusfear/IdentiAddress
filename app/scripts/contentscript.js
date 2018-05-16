// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
const IdentiAddress = require("./IdentiAddress");
const ident = new IdentiAddress();

// console.log(IdentiAddress)
// console.log(`'Allo 'Allo! Content script2`)

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
let replace =
    ident.formatAddressBlocks("0XF3F47Be96b7aeFa33bfdD741760268ed7049b6") +
    "<br/> " +
    ident.formatAddressBlocks("0XF3F47Be96b7aeFa33bfdD741760268ed7049b5") +
    "<br/> " +
    ident.formatAddressBlocks("0x7f3f47be96b7aefa33bfdd741760268ed7049b6c") +
    "<br/> " +
    ident.formatAddressBlocks("0x7f3f47be96b4aefa33bfdd741760268ed7049b6c") +
    "<br/>";

function r(f) {
    /in/.test(document.readyState) ? setTimeout(r, 9, f) : f();
}
r(function() {
    parseLinks();
});

parseLinks();

// document.getElementsByTagName("body")[0].innerHTML = replace + document.getElementsByTagName("body")[0].innerHTML;
