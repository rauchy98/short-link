const express = require('express'),
      app = express(),
      port = process.env.PORT || 3000,
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      session = require('express-session'),
      MongoStore = require('connect-mongo')(session),
      Link = require('./api/models/shortLinkModel'),
      User = require('./api/models/userModel');
      autoIncrement = require('mongoose-auto-increment');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Linksdb');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const decodeRoutes = require('./api/routes/decodeRoutes'),
      linkRoutes = require('./api/routes/linkRoutes'),
      userRoutes = require('./api/routes/userRoutes');

app.use('/api', userRoutes);
app.use('/api', linkRoutes);
app.use(decodeRoutes);

app.listen(port);

console.log('short-link server started on: ' + port);