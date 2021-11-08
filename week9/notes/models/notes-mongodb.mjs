import {Note, AbstractNotesStore} from './Notes.mjs';
import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;

const db = await (async () => {
  let client = await MongoClient.connect('mongodb://localhost:27017');
  return client.db('it339-notes');
})();

const notes = db.collection('notes');

class MongoDBNotesStore extends AbstractNotesStore {
  async create (key, title, body) {
    await notes.insertOne( {
      key: key,
      title: title,
      body: body,
    });

    return new Note(key, title, body);
  }

  async update (key, title, body) {
    await notes.updateOne({key: key}, {
      $set: {
        title: title,
        body: body
      }
    })

    return new Note(key, title, body);
  }

  async read (key) {
    let doc = await notes.findOne({key: key});
    return new Note(doc.key, doc.title, doc.body);
  }

  async destroy (key) {
    let doc = await notes.findOne({key: key});
    if (!doc) {
      throw new Error(`No note found for ${key}`);
    }

    return await notes.findOneAndDelete({key: key});
  }

  async keyList() {
    return await notes.find().map(note => note.key).toArray();
  }

  async count() {
    return await notes.countDocuments();
  }
}

export {MongoDBNotesStore}