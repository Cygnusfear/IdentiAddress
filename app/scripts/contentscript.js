// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
const IdentiAddress = require('./IdentiAddress');
const ident = new IdentiAddress();

console.log(IdentiAddress)
console.log(`'Allo 'Allo! Content script2`)
var links = Array.from(document.links);
links = Array.from(document.getElementsByTagName("span")).concat(links);
console.log(links)
for(var i = 0; i < links.length; i++) {
    let link = links[i];
    if (link.innerText.match(/0x/))
    {
        console.log(link)
        // console.log(ident.formatAddress(link.innerText)) 
        link.innerHTML = ident.formatAddressBlocks(link.innerText);
        console.log(link.innerText.length)
    }
    var re = /^0x([A-Fa-f0-9]{64})$/g;
    var m;

    do {
        m = re.exec(document.body.innerHTML);
        if (m) {
            console.log(m[1], m[2]);
        }
    } while (m);
    
  // var linkHref = document.createTextNode(links[i].href);
  // var lineBreak = document.createElement("br");
  // document.body.appendChild(linkHref);
  // document.body.appendChild(lineBreak);
}

