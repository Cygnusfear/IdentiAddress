// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
const IdentiAddress = require('./IdentiAddress');
const ident = new IdentiAddress();

// console.log(IdentiAddress)
// console.log(`'Allo 'Allo! Content script2`)
var links = Array.from(document.links);
links = Array.from(document.getElementsByTagName("span")).concat(Array.from(document.getElementsByTagName("div"))).concat(Array.from(document.getElementsByTagName("td"))).concat(links);
// console.log(links)
for(var i = 0; i < links.length; i++) {
    let link = links[i];
    if (link.innerText.match(/0x/))
    {
        // link.innerHTML = ident.formatAddressBlocks(link.innerText);
    }
    
  // var linkHref = document.createTextNode(links[i].href);
  // var lineBreak = document.createElement("br");
  // document.body.appendChild(linkHref);
  // document.body.appendChild(lineBreak);
}

var re = /^(0x)?[0-9a-zA-Z]{64}|^(0x)?[0-9a-zA-Z]{42}/g;
var m;

for (const a of links) {
  if (a.textContent.match(re)) {
    let inner = a.innerHTML;
    // console.log(a.textContent.match(re))
    // console.log("poep")
    if (inner.indexOf("<") > -1) continue;
    inner = inner.replace(a.textContent.match(re)["0"],ident.formatAddressBlocks(a.textContent.match(re)["0"]))
    console.log("replaced:", a.innerHTML)
    a.innerHTML = inner;
    // console.log(a.innerText)
    // console.log(a.innerHTML)
  }
}
let replace = ident.formatAddressBlocks("0XF3F47Be96b7aeFa33bfdD741760268ed7049b6") + " " + ident.formatAddressBlocks("0XF3F47Be96b7aeFa33bfdD741760268ed7049b5") + " " + ident.formatAddressBlocks("0x7f3f47be96b7aefa33bfdd741760268ed7049b6c") + " " + ident.formatAddressBlocks("0x7f3f47be96b4aefa33bfdd741760268ed7049b6c")

console

// document.getElementsByTagName("body")[0].innerHTML = replace + document.getElementsByTagName("body")[0].innerHTML;