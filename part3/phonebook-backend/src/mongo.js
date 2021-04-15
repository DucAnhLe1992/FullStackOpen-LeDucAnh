const mongoose = require("mongoose");

const command = process.argv;

if (command.length == 3 || command.length == 5) {
  const password = command[2];

  const url = `mongodb+srv://AlexDAL1992:${password}@cluster0.rbbuj.mongodb.net/persons?retryWrites=true&w=majority`;

  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model("Person", personSchema);

  if (command.length == 3) {
    Person.find({}).then((result) => {
        console.log("Phonebook:")
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });

  } else {
    const person = new Person({
      name: command[3],
      number: command[4],
    });

    person.save().then((result) => {
      console.log(`Added ${person.name} with number ${person.number} to phonebook`);
      mongoose.connection.close();
    });
  }

} else {
  console.log(
    "Please type in the command following the instructions:\nnode mongo.js <password>\nor\nnode mongo.js <password> new-name new-number"
  );
  process.exit(1);
}
