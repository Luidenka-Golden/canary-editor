const python_keywords = [
    "and", "as", "assert", "break", "class", "continue", "def", "del", "elif", "else", "except", "False",
    "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "None", "nonlocal", "not",
    "or", "pass", "raise", "return", "True", "try", "while", "with", "yield"
]

class Tokenize {
    constructor(text) {
        this.text = text;
        this.pos = 0;
        this.#advance();
    }

    #advance() {
        this.current = text[self.pos]
        self.pos += 1
    }

    tokenize(mode) {
        var tokens = [];
        if (mode == "python") {
            while (this.current != null) {
                if (this.current == "#") {
                    tokens.push(this.#make_comment());
                } /* else if (this.current in "qwertyuiopasdfghjklzxcvbnm_") {
                    tokens.push(this.#make_identifier());
                } */
            }
        }

        return tokens;
    }

    #make_comment() {
        var comment = "#";
        this.#advance()
        while (this.current != null) {
            comment += this.current;
            this.#advance()
        }

        return {"COMMENT": comment};
    }

    #make_number() {
        var num_str = this.current;
        this.#advance()
        while (this.current != null && this.current.includes("1234567890.")) {
            num_str += this.current;
            this.#advance()
        }
    }

    #make_identifier() {
        var identifier_str = this.current;
        this.#advance()
        while (this.current != null && this.current.includes("qwertyuiopasdfghjklzxcvbnm1234567890_")) {
            identifier_str += this.current;
            this.#advance()
        }

        if (identifier_str in python_keywords) {

        }
    }
}

function newEditor() {
    var editor = document.createElement("div");
    var lineNumber = document.createElement("div");
    var lineContent = document.createElement("div");

    editor.id = "canary-editor";
    editor.className = "language-python";
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

        // Syntax Highlighting
        var pos = getCaret(this);
        var tokenize = new Tokenize();
        console.log(tokenize.tokenize());
        syntaxHighlight(this);
        restoreSelection(this, pos);
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
    editor.appendChild(lineContent);
    document.body.appendChild(editor);
}

// Functions
function getCaret(containerEl) {
    var doc = containerEl.ownerDocument, win = doc.defaultView;
    var range = win.getSelection().getRangeAt(0);
    var preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(containerEl);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    var start = preSelectionRange.toString().length;

    return {
        start: start,
        end: start + range.toString().length
    }
}

function restoreSelection(containerEl, savedSel) {
    var doc = containerEl.ownerDocument, win = doc.defaultView;
    var charIndex = 0, range = doc.createRange();
    range.setStart(containerEl, 0);
    range.collapse(true);
    var nodeStack = [containerEl], node, foundStart = false, stop = false;

    while (!stop && (node = nodeStack.pop())) {
        if (node.nodeType == 3) {
            var nextCharIndex = charIndex + node.length;
            if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                range.setStart(node, savedSel.start - charIndex);
                foundStart = true;
            }
            if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                range.setEnd(node, savedSel.end - charIndex);
                stop = true;
            }
            charIndex = nextCharIndex;
        } else {
            var i = node.childNodes.length;
            while (i--) {
                nodeStack.push(node.childNodes[i]);
            }
        }
    }

    var sel = win.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function syntaxHighlight(el) {
    var text = el.innerText;

    text.replace(html, "<span class=\"tag-name\">&gt;$1&lt;</span>\
    <span class=\"html-attr-key\">$2</span")
}