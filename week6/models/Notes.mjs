class Note {
  #key;
  #title;
  #body;

  constructor(key, title, body) {
    this.#key = key;
    this.#title = title;
    this.#body = body;
  }

  get key() {
    return this.#key;
  }

  get title() {
    return this.#title
  }

  set title(title) {
    this.#title = title;
  }

  get body() {
    return this.#body
  }

  set body(body) {
    this.#body = body;
  }
}

class AbstractNotesStore {
  async create (key, title, body) {}
  async update (key, title, body) {}
  async read (key) {}
  async destroy (key) {}
  async keyList() {}
  async count() {}
}

export {Note, AbstractNotesStore};