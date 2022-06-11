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

    editor.appendChild(lineNumber);
    editor.appendChild(lineContent);
    document.body.appendChild(editor);
}