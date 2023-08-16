const { getNoteByIdService, createNewNoteService, editNoteByIdService, getAllNotesSkeletonService } = require('../services/notesService');

const getNoteByIdController = async (req, res) => {
    const user = req?.user;
    const noteId = req?.params?.id;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }

    if (!noteId || noteId === '' || noteId === undefined) {
        return res.status(400).send('Note id is required');
    }

    try {
        result = await getNoteByIdService(user, noteId);
        if (result) {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const createNewNoteController = async (req, res) => {
    const user = req?.user;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }

    try {
        result = await createNewNoteService(user);
        if (result) {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const editNoteByIdController = async (req, res) => {
    const user = req?.user;
    const noteId = req?.params?.id;
    const note = req?.body?.note;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }

    if (!noteId || noteId === '' || noteId === undefined) {
        return res.status(400).send('Note id is required');
    }

    if (!note || note === '' || note === undefined) {
        return res.status(400).send('Note is required');
    }

    try {
        result = await editNoteByIdService(user, noteId, note);
        if (result) {
            res.status(200).send({ sucess: true });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const getAllNotesSkeletonController = async (req, res) => {
    const user = req?.user;

    if (!user || user === '' || user === undefined) {
        return res.status(400).send('User is required');
    }


    try {
        result = await getAllNotesSkeletonService(user);
        if (result) {
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}


module.exports = {
    getNoteByIdController,
    createNewNoteController,
    editNoteByIdController,
    getAllNotesSkeletonController
};
