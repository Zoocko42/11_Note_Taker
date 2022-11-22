const express = require('express')
const notes = require('express').Router();
const savedNotes = require('../db/db.json')
const uniqid = require('uniqid')
const fs = require('fs')

// This will allow the server to retrieve saved notes from the db.json file.
notes.get('/', (req, res) =>
    res.json(savedNotes)
);

// This posts saved note to the db.json file.
notes.post('/', (req, res) => {
    const { title, text } = req.body

    if (title && text ) {
        const newNote = {
            title,
            text,
            id: uniqid()
        };

        fs.readFile('./db/db.json', 'utf8', (err, data)=> {
            if(err) {
                console.log("Error, database cannot be found!")
            } else {
                var notesParsed = JSON.parse(data);

                notesParsed.push(newNote);

                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(notesParsed, null, 3),
                    (writeErr) => writeErr ? console.log(writeErr) : console.log ("Note saved!")
                )
            }
        });

        const response = {
            status: "success",
            body: newNote
        };

        res.status(200).json(response)
    } else {
        res.status(500).json('Error, note not posted')
    }
});

module.exports = notes;