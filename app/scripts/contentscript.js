// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
const IdentiAddress = require('./IdentiAddress');
const ident = new IdentiAddress();
const $ = require("jquery");

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

var re = /<a.*href=\".*"|(0x)?[0-9a-zA-Z]{42}/g;
var m;

for (const a of links) {
  if (a.textContent.match(re)) {
    let inner = a.innerHTML;
    // console.log(a.textContent.match(re))
    // console.log("poep")
    if (a.innerHTML.indexOf("href") > -1) continue;
    inner = inner.replace(a.textContent.match(re)["0"],ident.formatAddressBlocksBorder(a.textContent.match(re)["0"]))
    a.innerHTML = inner;
    // console.log(a.innerText)
    // console.log(a.innerHTML)
  }
}