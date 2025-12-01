const express = require('express');
const app = express();
const PORT = 5000;

app.get('/test', (req, res) => res.send('Hello World'));

app.listen(PORT, () => console.log(`Server running on port test ${PORT}`));
