var ols = Array.prototype.slice.call(document.querySelectorAll("ol,table"));
ols.forEach(ol => {
	var lis = Array.prototype.slice.call(ol.querySelectorAll("li,tr"));
	if (lis.length >= 22){
		var showMore = document.createElement("a");
		// showMore.innerText = `Show ${lis.length - 22 + 1} more...`;
		showMore.style.setProperty("--text",`'Show ${lis.length - 22 + 1} more...'`);
		showMore.href = "#";
		showMore.classList.add("show-more")
		showMore.onclick = function(){
			ol.classList.add("expanded");
			showMore.parentNode.removeChild(showMore);
			return false;
		}
		ol.parentNode.insertBefore(showMore, ol.nextSibling);
	}
});