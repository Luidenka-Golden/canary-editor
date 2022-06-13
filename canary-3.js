function newEditor() {
    var editor = document.createElement("div");
    var lineNumber = document.createElement("div");
    var withSyntaxHighlight = document.createElement('div');
    var lineContent = document.createElement("div");

    editor.id = "canary-editor";
    editor.className = "language-python";
    lineNumber.id = "line-number";
    lineNumber.innerText = "1";
    lineContent.id = "line-content";
    lineContent.spellcheck = false;
    lineContent.contentEditable = true;
    withSyntaxHighlight.id = "syntaxHighlight";

    lineContent.addEventListener("input", () => {
        // Showing line numbers
        lineNumber.innerHTML = "";
        const lineCount = lineContent.innerText.split("\n").length;
        if (lineCount != 1) {
            isNewLine = true;
            for (let l = 0; l < lineCount; l++) {
                if (l != 0) {
                    lineNumber.innerText += l;
                    lineNumber.innerText += "\n";
                }
            }
        }
        else lineNumber.innerText = 1;

        withSyntaxHighlight.innerText = this.innerText;

        // var pos = getCaret(this);
        // restoreSelection(this, pos);
    });

    lineContent.addEventListener("keypress", function (e) {
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

    editor.appendChild(lineNumber);
    editor.appendChild(withSyntaxHighlight);
    editor.appendChild(lineContent);
    document.body.appendChild(editor);
}