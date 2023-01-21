const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');
const uuid = require('./public/assets/helper/uuid');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get('/api/notes', (req, res) => { 
    fs.readFile('./db/db.json', 'utf8', function(err, data){
        res.json(JSON.parse(data));
    })});

app.post('/api/notes', (req, res) => {
        const { title, text } = req.body;

        if (title && text) {
          
          const newNote = {
           title,
           text,
           id: uuid(),
          };
          fs.readFile('./db/db.json', 'utf8', function(err, data){
            const dbData = JSON.parse(data);
            dbData.push((newNote));
            fs.writeFile('./db/db.json', JSON.stringify(dbData), (err) => {
                if (err) {
                    console.log(err);
                }else{
                    res.json(newNote);
                }
            })
        })}});

app.listen(PORT, () =>
    console.log(`Exampe app listening at http://localhost:${PORT}`)
);