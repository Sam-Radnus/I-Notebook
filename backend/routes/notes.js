const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
//ROUTE 1:Get all notes using :GET"/api/notes/getUSER"logic required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})
//ROUTE 2:Add a new note using :POST "/api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })], async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id     //destructuring
            })
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
//ROUTE:3 Updating an existing note using PUT "/API/notes/updatenotes".Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;       //de-structuring
    //Create a newNote Object
    const newNote = {};
    if (title) { newNote.title = title };   //updated data
    if (description) { newNote.description = description };   //updated data
    if (tag) { newNote.tag = tag };   //updated data

    let note = await Note.findById(req.params.id)//Built in function
    if (!note) {
        return res.status(404).send("NOT FOUND!!!")
    }
    if (note.user.toString() != req.user.id) {
        return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });
})

//ROUTE 4:Delete an Existing Note using:DELETE"/api/notes/deletenote.login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    //Create a newNote Object
    try {

        let note = await Note.findById(req.params.id)         //Finding if the user already exists
        if (!note) {                        
            return res.status(404).send("NOT FOUND!!!")
        }
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router