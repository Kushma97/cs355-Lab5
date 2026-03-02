const express = require('express');
const nedb = require('nedb-promises');
const app = express();
const db = nedb.create('myfile.jsonl');
app.use(express.static('public'));
app.get('/insert', async (req, res) => {
  try {
    const document = JSON.parse(req.query.data);
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
app.get('/search', async (req, res) => {
  try {
    const query = JSON.parse(req.query.data);
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

