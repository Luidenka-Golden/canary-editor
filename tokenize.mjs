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
                } else if (this.current in "qwertyuiopasdfghjklzxcvbnm_") {
                    tokens.push(this.#make_number());
                }
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
}

export {Tokenize}