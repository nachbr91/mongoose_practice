// Dependencies from npm
const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');

//Own Variables
const DB = 'mongoose-example';
const app = express();
const PORT = 3000;

//Models
const Student = require('./models/Student.js');

//Connection to DB
const connectToMongo = async () => {
  try {
    await mongoose.connect('mongodb+srv://<user>:<password>@cluster0.r4vv6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(chalk.blue('Conectado a Mongo'));
  } catch (err) {
    console.log('Error:', err);
  }
};
connectToMongo();

//Middleware for the view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

//Routes

app.get('/', (req, res) => {
  res.render('home.hbs');
});

app.get('/student/:id', async (req, res) => {
  const studentInfoFromDatabase = await Student.findById(req.params.id)
  res.render('student.hbs', studentInfoFromDatabase);
});

//Llamada a la base de datos y enviarlo al front-end
app.get('/all-students', async (req, res) => {
  const allStudents = await Student.find({}, {name: 1, lastName: 1})
  res.render('allStudents.hbs', {allStudents});
});

//Server listener
app.listen(PORT, () => {
  console.log(chalk.red(`Server open at PORT ${PORT}`));
});
