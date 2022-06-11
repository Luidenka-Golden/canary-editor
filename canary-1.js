// Variables
var editableEl = document.getElementById("line-content");

// Events
editableEl.addEventListener("input", function(e) {

    // Showing line numbers
    document.getElementById("line-number").innerHTML = "";
    const lineCount = document.getElementById("line-content").innerText.split("\n").length;
    if (lineCount != 1) {
        isNewLine = true;
        for (let l = 0; l < lineCount; l++) {
            if (l != 0) {
                document.getElementById("line-number").innerText += l;
                document.getElementById("line-number").innerText += "\n";
            }
        }
    }
    else document.getElementById("line-number").innerText = 1;
});

editableEl.addEventListener("keypress", function(e) {
    var charTyped = String.fromCharCode(e.which);
    if (charTyped == "{" || charTyped == "(" || charTyped == "[" || charTyped == "\"" || charTyped == "'") {
        
        e.preventDefault();
        
        var sel = window.getSelection();
        if (sel.rangeCount > 0) {
            
            var range = sel.getRangeAt(0);
            range.deleteContents();
            
            
            var text;
            if (charTyped == "{") text = "{}"
            else if (charTyped == "[") text = "[]"
            else if (charTyped == "\"") text = "\"\""
            else if (charTyped == "'") text = "''"
            else text = "()"
            var textNode = document.createTextNode(text);
            range.insertNode(textNode);
            
            
            range.setStart(textNode, 1);
            range.setEnd(textNode, 1);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }                                                                                                                                                                                                                                                                                                                                                                                                                           
}, false);

const js = el => {
    var text = el.innerHTML;

    el.innerHTML.replace(/\/\/(.*)/gm, "<span class=\"highlight-comment\">//$1</span>")
}

function getPosition() {
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt) {
            return sel.getRangeAt(0).startOffset;
        }
    }
    return null;
}

document.getElementById('line-content').addEventListener('keypress', (e) => {
    var cursor = getPosition();
    console.log(cursor);
})