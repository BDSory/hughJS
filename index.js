const express = require('express');
const bodyParser = require('body-parser');
const usersRepo = require('./repositories/users')

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  res.send(`
    <div>
      <form method = "POST">
        <input name = "email" placeholder="email" />
        <input name = "fName" placeholder="fName" />
        <input name = "lName" placeholder="lName" />
        <input name = "dateOfBirth" placeholder="dateOfBirth" />
        <input name = "password" placeholder="password" />
        <input name = "passwordConfirmation" placeholder="passwordConfirmation" />
        <button> Sign Up </button>
      </form>
    </div>
  `);
});

app.post('/', async (req, res) => {
  const {email, fName, lName, dateOfBirth, password, passwordConfirmation} = req.body; 

  const existingUser = await usersRepo.getOneBy({email});
  if(existingUser) {
    return res.send('Email in use');
  }

  res.send('Account created!')
});

app.listen(3000, () => {
  console.log('Listening....')
})