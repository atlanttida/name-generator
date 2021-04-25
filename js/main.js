const NameGen = require('../lib/namegen.js');
require('../lib/extend-namegen');
const BgSwitcher = require("./background-switcher");

const maxNames = 5;
var generator = NameGen.compile(/*"G The P k Q"*/
            //"The P Q"
            window.GENERATOR_PATTERN?htmlDecode(window.GENERATOR_PATTERN):"G The P"

);
var output = document.querySelector(".output");

// document.querySelector("input[name=pattern]").oninput=document.querySelector("input[name=pattern]").onchange = (e) => {
//     generator = NameGen.compile(e.target.value);
// }
document.querySelector("button[name=go]").onclick = () =>{

    document.querySelector(".usr").style.display="none";

    //show ads
    document.querySelectorAll(".google-ad").forEach(el =>el.classList.remove("d-none"));
    output.innerHTML = "";
    BgSwitcher.changeBg();
    for (var i=0;i<maxNames;i++){
        var p = document.createElement("p");
        var generatedName = generator.toString().capitalize();
        p.innerHTML = '<button class="btn btn-outline-light btn-lg"> '+generatedName + ' | <i class="bi bi-clipboard-check"></i> Copy</button>';
        var btn = output.appendChild(p).firstChild;
        btn["data-txt"] = generatedName;
        btn.onclick = copyToClipboard;
    }
}


function copyToClipboard(e) {
    /* Get the text field */
    var input = document.createElement("textarea");
    input.style.style = {position: 'absolute', left: '-9999px'};
    input.value = e.target["data-txt"];
    document.body.appendChild(input);
    /* Select the text field */
    input.select();
    input.setSelectionRange(0, 99999); /* For mobile devices */
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    // alert("Copied the text: " + input.value);
    input.parentElement.removeChild(input);
  }

  String.prototype.capitalize = function() {
    return this.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  }

function htmlDecode(input){
  var e = document.createElement('textarea');
  e.innerHTML = input;
  // handle case of empty input
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}