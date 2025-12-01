const express = require('express');
const sequelize = require('./configurations/db');
const Event = require('./models/event.model');
const EventImage = require('./models/eventImage.model');
const eventRoutes = require('./routes/event.routes');
const path = require('path');
const cors = require('cors');


const app = express();
app.use(express.json());

app.use(cors());
app.get('/test', (req, res) => {
  res.send('Hello World');
});

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/events', eventRoutes);


const PORT = 8080;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Server running on porttt ${PORT}`));
});
