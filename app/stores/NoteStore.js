import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);

    // init notes store
    this.notes = [];

    this.exportPublicMethods({
      getNotesByIds: this.getNotesByIds.bind(this)
    });
  }

  getNotesByIds(ids) {
    return (ids || []).reduce((notes, id) =>
      // Concatenate possible matching ids to the result
      notes.concat(
        this.notes.filter(note => note.id === id)
      )
    , []);
  }

  create(note) {
    note.id = uuid.v4();

    const notes = this.notes.concat(note);

    this.setState({notes});

    return note;
  }

  update(updateNote) {
    const notes = this.notes.map(note => {
      if (note.id === updateNote.id) {
        note.task = updateNote.value;
        return Object.assign({}, note, updateNote);
      }
      return note;
    });

    this.setState({notes});
  }

  delete(id) {
    const notes = this.notes.filter(note => {
      return note.id !== id;
    });

    this.setState({notes});
  }
}

/**
 * Expose
 */
export default alt.createStore(NoteStore, 'NoteStore');