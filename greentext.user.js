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

var TEXT_NODE, cdm_listener, changeTextNodes, green, insertion_listener, replaceTextContent, replacingContent;

replaceTextContent = function(node) {
  var replacingContent, span;
  if (node.parentNode.getAttribute("contenteditable")) {
    return;
  }
  replacingContent = true;
  if (node.textContent.trim().substr(0, 1) === ">") {
    span = document.createElement("span");
    span.className = "implied";
    span.textContent = node.textContent;
    span.style.color = green;
    node.parentNode.replaceChild(span, node);
  }
  return replacingContent = false;
};

changeTextNodes = function(node) {
  var parent, _i, _len, _ref;
  parent = node.parentNode;
  if (parent.getAttribute("contenteditable") || parent.className === "implied" || parent.style.color) {
    return;
  }
  if (node.nodeType === TEXT_NODE) {
    try {
      return replaceTextContent(node);
    } catch (err) {
      return console.log(err);
    }
  } else {
    _ref = node.childNodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      changeTextNodes(node);
    }
  }
};

insertion_listener = function(event) {
  return changeTextNodes(event.target);
};

cdm_listener = function(event) {
  if (!replacingContent) {
    return replaceTextContent(event.target);
  }
};

green = "rgb(120, 153, 34)";

TEXT_NODE = Node.TEXT_NODE || 3;

replacingContent = false;

changeTextNodes(document.body);

document.body.addEventListener("DOMNodeInserted", insertion_listener, false);

document.body.addEventListener("DOMCharacterDataModified", cdm_listener, false);
