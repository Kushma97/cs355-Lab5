const express = require('express');
const nedb = require('nedb-promises');
const app = express();
const db = nedb.create('myfile.jsonl');
app.use(express.json());
app.use(express.static('public'));

app.post('/insert', async (req, res) => {
  try {
    const document = req.body;

    const inserted = await db.insert(document);

    res.json({
      success: true,
      data: inserted
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

app.post('/search', async (req, res) => {
  try {
    const query = req.body;

    const results = await db.find(query);

    res.json({
      success: true,
      data: results
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});
app.use((req, res) => {
  res.status(404).send('Invalid URL.');
});

app.listen(3000, () => console.log('server started…'));