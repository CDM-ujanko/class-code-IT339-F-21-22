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

  get JSON() {
    return JSON.stringify({
      key: this.#key,
      title: this.#title,
      body: this.#body
    })
  }

  set JSON(json) {
    const data = JSON.parse(json);

    if (typeof data !== 'object' ||
        !data.hasOwnProperty('key') ||
        !data.hasOwnProperty('title') ||
        !data.hasOwnProperty('body') ||
        typeof data.key !== 'string' ||
        typeof data.title !== 'string' ||
        typeof data.body !== 'string') {
      throw new Error(`Not a valid note: ${json}`);
    }

    return new Note(data.key, data.title, data.body);
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