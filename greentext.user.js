// ==UserScript==
// @name greentext
// @namespace Draceros
// @url https://gist.github.com/3202054
// @version 1.0
// @description implying
// @match *://*/*
// @exclude *4chan*
// @license MIT License
// ==/UserScript==

function implying(str) {
  var t = document.createElement("span");
	t.innerHTML = str;
	t.className = "implying";
	t.style.color = "#789922";
	return t;
}

function escapeHtml(unsafe) {
  return unsafe
      .replace(/&(?!amp;)/g, "&amp;")
      .replace(/<(?!lt;)/g, "&lt;")
      .replace(/>(?!gt;)/g, "&gt;")
      .replace(/"(?!quot;)/g, "&quot;")
      .replace(/'(?!#039;)/g, "&#039;");
}

var TEXT_NODE = Node.TEXT_NODE || 3;

var replacingContent = false;
function replaceTextContent(node) {
	if(node.parentNode.getAttribute("contenteditable")) return;
	replacingContent = true;
	if(node.textContent.substr(0,1) == ">") {
		var txt = node.textContent;
		var parent = node.parentNode;
		parent.innerHTML = parent.innerHTML.replace(escapeHtml(txt), "<div id=\"implytest\"></div>");
		parent.replaceChild(implying(txt), document.getElementById("implytest"));
	}
	replacingContent = false;
}

function changeTextNodes(node) {
	var length, childNodes, parent = node.parentNode;
	
	if(parent.getAttribute("contenteditable")) return;
	if(parent.className.indexOf("implying") > -1) return;
	
	
	if (node.nodeType == TEXT_NODE) {
			replaceTextContent(node);
	} else {
		childNodes = node.childNodes;
		length = childNodes.length;
		for(var i=0; i<length; ++i){
			changeTextNodes(childNodes[i]);
		}
	}
}

function insertion_listener(event) {
	changeTextNodes(event.target)
}

function cdm_listener(event) {
	if(!replacingContent){
		replaceTextContent(event.target);
	}
}

changeTextNodes(document.body);
document.body.addEventListener ("DOMNodeInserted", insertion_listener, false);
document.body.addEventListener ("DOMCharacterDataModified", cdm_listener, false);
