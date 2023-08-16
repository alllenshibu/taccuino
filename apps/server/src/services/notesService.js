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

const createNewNoteService = async (user) => {
    try {
        console.log('Creating new note');
        const u = await User.findOne({ username: user });

        if (!u) {
            throw new Error('User not found');
        }

        const note = new Note({
            title: 'New',
            content: '',
            userId: u._id
        });

        await note.save();

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



const getAllNotesSkeletonService = async (user) => {
    try {
        console.log('Getting all notes skeleton');
        const u = await User.findOne({ username: user });

        if (!u) {
            throw new Error('User not found');
        }

        let notes = await Note.find({ userId: u._id });

        if (!notes) {
            throw new Error('Note not found');
        }

        notes = notes.map(n => {
            return {
                id: n._id,
                title: n.title,
            }
        })

        return notes;

    } catch (err) {
        throw new Error(err.message);
    }
}


module.exports = {
    getNoteByIdService,
    createNewNoteService,
    editNoteByIdService,
    getAllNotesSkeletonService
};