const express = require('express');
const path = require('path');
// Setting up the port and requirements
const app = express();
const api = require('./routes/index')

const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));


// This will return the index.html file.
app.get('/', (req, res) => res.send('Navigate to home page'))
// This returns the notes page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`Site active at http://localhost:${PORT}`)
);