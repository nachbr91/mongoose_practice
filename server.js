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
    await mongoose.connect(
      'mongodb+srv://<user>:<password>@cluster0.r4vv6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(chalk.blue('Conectado a Mongo'));
  } catch (err) {
    console.log('Error:', err);
  }
};
connectToMongo();

//Middleware for the view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

//Middleware for the public
app.use(express.static('public'));

//Middleware for body-parser
app.use(express.json());

//Routes

app.get('/', (req, res) => {
  res.render('home.hbs');
});

app.get('/student/:id', async (req, res) => {
  try {
    const studentInfoFromDatabase = await Student.findById(req.params.id, {
      name: 1,
      lastName: 1,
      age: 1,
      class: 1,
      idioma: 1,
    });
    res.render('student.hbs', studentInfoFromDatabase);
  } catch (err) {
    res.render('error.hbs', {
      errorMsg: 'El ID proporcionado no corresponde con ningún alumno.',
    });
  }
});

//Llamada a la base de datos y enviarlo al front-end
app.get('/all-students', async (req, res) => {
  const allStudents = await Student.find({}, { name: 1, lastName: 1, _id: 1 });
  res.render('allStudents.hbs', { allStudents });
});

app.get('/new-student', (req, res) => {
  res.render('newStudent.hbs');
});

//Ruta POST para crear un nuevo estudiante
app.post('/new-student', async (req, res) => {
  try {
    const createdStudent = await Student.create(req.body);
    res.send(createdStudent);
  } catch (err) {
    console.log(err);
  }
});

//Ruta DELETE para eliminar un alumno por su ID

app.delete('/student/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    res.send(deletedStudent);
  } catch (err) {
    console.log(err);
  }
});

//Ruta PUT para editar un alumno
app.put('/edit-student/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send(updatedStudent);
  } catch (err) {
    console.log(err);
  }
});

//Server listener
app.listen(PORT, () => {
  console.log(chalk.red(`Server open at PORT ${PORT}`));
});
