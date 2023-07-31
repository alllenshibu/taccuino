const User = require("../models/User");
const Note = require("../models/Note");

const getNoteByIdService = async (user, noteId) => {
    try {
        console.log('Getting note by id');
        const u = await User.findOne({ username: user });

        if (!u) {
            throw new Error('User not found');
        }

        const note = await Note.findOne({ _id: noteId, userId: u._id });

        if (!note) {
            throw new Error('Note not found');
        }

        return note;

    } catch (err) {
        throw new Error(err.message);
    }
}


const editNoteByIdService = async (user, noteId, note) => {
    try {
        console.log('Editing note by id');
        const u = await User.findOne({ username: user });

        if (!u) {
            throw new Error('User not found');
        }
        const n = await Note.findById(noteId);

        if (!n) {
            throw new Error('Note not found');
        }

        if (n.userId.toString() !== u._id.toString()) {
            throw new Error('Note not found');
        }

        n.title = note.title;
        n.content = note.content;

        await n.save();

        return true;

    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    getNoteByIdService,
    editNoteByIdService
};