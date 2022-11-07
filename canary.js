const keywordList = [
    'asm', 'auto', 'break', 'case', 'catch', 'const_cast', 'continue', 'default', 'delete', 'do',
    'dynamic_cast', 'else', 'explicit', 'export', 'false', 'for', 'friend', 'goto', 'if', 'inline', 'operator',
    'register', 'reinterpret_cast', 'return', 'static', 'static_cast', 'struct', 'switch', 'template',
    'this', 'throw', 'true', 'try', 'typeid', 'typename', 'virtual', 'volatile', 'wchar_t', 'while', '#include'
];

const dataTypes = [
    'bool', 'char', 'class', 'const', 'double', 'enum', 'extern', 'float', 'int', 'long', 'mutable', 'namespace', 'new',
    'private', 'protected', 'public', 'short', 'signed', 'sizeof', 'struct', 'static', 'typedef', 'union', 'unsigned',
    'using', 'void'
];

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
        const c = getCaretCharacterOffsetWithin(lineContent);
        lineContent.innerHTML = highlight(lineContent.innerText, "cpp");
        setCaret(lineContent, c);
    });

    lineContent.addEventListener("keypress", (e) => {
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
    });

    lineContent.addEventListener('keydown', (e) => {
        if (e.keyCode == 9) {
            e.preventDefault();
            insertTab();
        }
    });

    lineContent.addEventListener("scroll", () => {
        lineNumber.scrollTop = lineContent.scrollTop;
    });

    editor.appendChild(lineNumber);
    editor.appendChild(lineContent);
    document.body.appendChild(editor);
}

function newEditorWithElement(el) {
    var editor = document.getElementById(el);
    var lineNumber = document.createElement("div");
    var lineContent = document.createElement("div");

    lineNumber.id = "line-number";
    lineNumber.innerText = "1";
    lineContent.id = "line-content";
    lineContent.spellcheck = false;
    lineContent.contentEditable = true;

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
        const c = getCaretCharacterOffsetWithin(lineContent);
        lineContent.innerHTML = highlight(lineContent.innerText, "cpp");
        setCaret(lineContent, c);
    });

    lineContent.addEventListener("keypress", (e) => {
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
    });

    lineContent.addEventListener('keydown', (e) => {
        if (e.keyCode == 9) {
            e.preventDefault();
            insertTab();
        }
    });

    lineContent.addEventListener("scroll", () => {
        lineNumber.scrollTop = lineContent.scrollTop;
    });

    editor.appendChild(lineNumber);
    editor.appendChild(lineContent);
}

// Misc

function insertTab() {
    if (!window.getSelection) return;
    const sel = window.getSelection();
    if (!sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    range.collapse(true);
    const span = document.createElement('span');
    span.appendChild(document.createTextNode('    '));
    span.style.whiteSpace = 'pre';
    range.insertNode(span);
    range.setStartAfter(span);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}

// Syntax Highlighting

function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ((sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

function encodeHTMLEntities(rawStr) {
    return rawStr.replace(/[\u00A0-\u9999<>\&]/g, ((i) => `&#${i.charCodeAt(0)};`));
}

function setCaret(el, pos) {
    for (var node of el.childNodes) {
        if (node.nodeType == 3) {
            if (node.length >= pos) {
                var range = document.createRange(),
                    sel = window.getSelection();
                range.setStart(node, pos);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
                return -1;
            } else {
                pos -= node.length;
            }
        } else {
            pos = setCaret(node, pos);
            if (pos == -1) return -1;
        }
    }
    return pos;
}

function highlight(text, lang) {
    const words = encodeHTMLEntities(text).split(/(\s+)/);
    if (lang == "cpp") {
        const output = words.map(word => {
            if (dataTypes.includes(word)) {
                return `<span style="color: rgb(105, 182, 250);">${word}</span>`;
            } else if (keywordList.includes(word)) {
                return `<span style='color: rgb(221, 172, 250);'>${word}</span>`;
            } else if (word.match(/".*"/)) {
                return `<span style="color: rgb(217, 168, 147)">${word}</span>`;
            } else if (word.match(/&#60;.*&#62;/)) {
                return `<span style="color: rgb(217, 168, 147)">${word}</span>`;
            } else if (word.match(/\w*\(.*\)/)) {
                return `<span style="color: rgb(248, 252, 187)">${word}</span>`
            } else return word;
        });
        return output.join('');
    }
}