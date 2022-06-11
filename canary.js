function newEditor() {
    var editor = document.createElement("div");
    var lineNumber = document.createElement("div");
    var lineContent = document.createElement("div");

    editor.id = "canary-editor";
    lineNumber.id = "line-number";
    lineNumber.innerText = "1";
    lineContent.id = "line-content";
    lineContent.spellcheck = false;
    lineContent.contentEditable = true;

    lineContent.addEventListener("input", function(e) {

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

    editor.appendChild(lineNumber);
    editor.appendChild(lineContent);
    document.body.appendChild(editor);
}