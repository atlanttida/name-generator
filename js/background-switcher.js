const numBackgrounds = 13;
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
document.body.className += " bg-image-"+(getRandomInt(numBackgrounds)+1);

function changeBg(){
    document.body.className = document.body.className.replace(/bg-image-\d+/,"bg-image-"+(getRandomInt(numBackgrounds)+1))
}

module.exports={changeBg}