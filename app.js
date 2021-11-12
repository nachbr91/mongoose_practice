// $ npm init -y para añadir package.json
// Instalo mongoose: $ npm i mongoose

// Importo mongoose
const mongoose = require('mongoose')
const chalk = require('chalk');
// Creo constante para nuestra DB
const DB = 'mongoose-example'

// Exporto modelo
const Student = require('./models/Student.js');

// Conecto la DB a nuestro JS, siempre se va a utilizar la misma url + nombre de la DB y 2 argumentos. Ejemplo utilizando async/await:
const connectToMongo = async() => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(chalk.blue('Conectado a Mongo'))
  } catch(err) {
    console.log('Error:', err)
  }
}
connectToMongo();

// 1. Create a new document:
const createStudent = async() => {
  try{
    const student = await Student.create( {
      name: 'Jimena',
      lastName:'Miranda',
      age: 9,
      grades: [8, 8, 8, 8, 9, 9, 10],
      class: 'A',
      pendingBills: false
    })
    console.log(chalk.red('student'))
  } catch(err) {
    console.log('Error:', err)
  }
}
// createStudent();

// 2. Read:
//2.1 Student.find(filter, project) --> este metodo nos sirve para buscar todos los documentos sobre un modelo determinado que cumplan la condicion que le pasamos por el filter (primer argumento)
const findStudent = async() => {
  try {
    const students = await Student.find({age: 10}, {name: 1,  lastName: 1}) // Encuentra a todos los alumnos que tengan 10 años y devuelve solo su nombre y apellido y el _id que ya viene por defecto
    console.log(students)
  } catch(err) {
    console.log('Error:', err)
  }
}
// findStudent();

//2.2 Student.findById(id) --> este metodo permite buscar un documento por su _id:
const findStudentById = async (id) => {
  try {
    const student = await Student.findById(id) // Encuentra al alumno que tenga el _id asociado
    console.log(student)
  } catch(err) {
    console.log('Error:', err)
  }
}
// findStudentById('618e3db780f19cced1849ce0')

//3. Update
//3.1 findOneAndUpdate(target, elementos que quiero cambiar, {new: true}):  --> Este metodo nos va a buscar un documento (target) y lo va a editar segun los elementos que hayamos pasado en el segundo argumento (dentro de un objeto literal)
const updateStudent = async () => {
  try {
    const student = await Student.findOneAndUpdate(
      {name: 'Jaime'},
      {"grades.0": 7, pendingBills: false, lastName: 'Rodriguez'},  //Para acceder a un array dentro de mongo, hay que hacerlo con un . y poner todo el query
      {new: true}  // Esto hay que ponerlo para ver el documento despues de haber sido actualizado. Si no ponemos esto, vamos a ver el documento antes de haber sido actualizado.
    ) // Encuentra al primer alumno que se llame Jaime y cambiar su primera  nota dentro de grades a 7
    console.log(student)
  } catch(err) {
    console.log('Error:', err)
  }
}
// updateStudent()

//3.2 updateMany()
// const updateSomeStudents = async () => {
//   try {
//     const response= await Student.updateMany({age: 8}, {age: 15}) //Cambia la edad de todos los alumnos que tengan 8 años a 15 años
//     console.log(response)
//   } catch(err) {
//     console.log('Error:', err)
//   }
// }
// updateSomeStudents()

const updateSomeStudents = async ()=>{
  try{
    const response = await Student.updateMany({idioma: {$exists: false}}, {idioma: "NA"}) //Añade el campo de idioma a todos los alumnos que no tuvieran el campo de idioma (y ponles el valor de NA)
    console.log(response)
  }catch(err){
    console.log("ERROR: ", err)
  }
}
updateSomeStudents()

//3.3 findByIdAndUpdate(id, <elementos a actualizar>, {new: true}) --> Este metodo funciona solo con _id. Te busca el documento que teenga es _id unico y lo actualiza con las propiedads que haya definido 
const updateStudentById = async (id) => {
  try {
    const updateStudent = await Student.findByIdAndUpdate(id, {age:5}, {new: true}) // Encuentra el alumno con el _id asociado y actualiza su edad a 5
    console.log(updateStudent)
  } catch(err) {
    console.log(err)
  }
}
// updateStudentById("618e3db780f19cced1849ce0")

//4. Delete
//4.1 .findOneAndDelete()
const deleteOneStudent = async () => {
  try {
    const response = await Student.findOneAndDelete({name: 'Andrea'}) // Elimina al primer alumno que encuentre que se llame Andrea
    console.log(response)
  } catch(err){
    console.log('Error:', err)
  }
}
// deleteOneStudent();

//4.2 .deleteMany()
const deleteManyStudents = async () => {
  try {
    const response = await Student.deleteMany({name: 'Andrea'}) // Elimina todos los alumnos que se llamen Andrea
    console.log(response)
  } catch(err){
    console.log('Error:', err)
  }
}
// deleteManyStudents();

//4.3. findByIdAndDelete()
const deleteStudentById = async (id) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(id, {new: true}) // Elimina el documento con el _id asociado
    console.log(deletedStudent)
  } catch(err){
    console.log('Error:', err)
  }
}
// deleteStudentById('618e43261ecc34c74d682e90')