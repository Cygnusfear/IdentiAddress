// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'

const IdentiAddress = require("./IdentiAddress");
const ident = new IdentiAddress();
// const Lookup = require("./ENSReverseLookup");
// const enslookup = new Lookup();

let parseLinks = function() {
    var links = Array.from(document.links);
    links = Array.from(document.body.getElementsByTagName("*")).concat(links);

    var re = /(0[xX][0-9a-zA-Z]{40}(?![0-9a-zA-Z]))/g;
    var m;
    for (const a of links) {
        let inner = a.innerHTML;
        if (inner.indexOf("<") > -1) continue;
        // console.log(a.innerHTML);
        if (a.textContent.match(re)) {
            // console.log("poep");
            let address = a.textContent.match(re)["0"];
            inner = inner.replace(
                address,
                ident.formatAddressBottomBorder(address),
            );
            // enslookup.resolve(address).then(lookup => {
            //     if (lookup) {
            //         let el = document.body.getElementById("address-" + address);
            //         el.outerHTML = ident.formatAddressBottomBorder(lookup);
            //     }
            // });
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
