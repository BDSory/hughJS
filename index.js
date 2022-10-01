const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users')

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieSession({
  keys: ['alphaOmega']
}))

app.get('/signup', (req, res) => {
  session_id = ""
  if (req.session.userId != null) {
    session_id = req.session.userId
  } else
  {
    session_id = ""
  }
  res.send(`
    <div>
    ${session_id}
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

app.post('/signup', async (req, res) => {
  const {email, fName, lName, dateOfBirth, password, passwordConfirmation} = req.body; 

  const existingUser = await usersRepo.getOneBy({email});
  if(existingUser) {
    return res.send('Email in use');
  }

  if(password !== passwordConfirmation) {
    return res.send('Passwords must match')
  }

  const user = await usersRepo.create({email, password, fName, lName, dateOfBirth})

  req.session.userId = user.id; 

  res.send('Account created!')
});

app.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are signed out.')
})

app.get('/signin', (req, res) => {
  res.send(`
  <div>
    <form method = "POST">
      <input name = "email" placeholder="email" />
      <input name = "password" placeholder="password" />
      <button> Sign In </button>
    </form>
  </div>
  `)
})

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({email});

  if(!user) {
    return res.send('Email not found');
  }

  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  );

  if(!validPassword) {
    return res.send('Invalid Password');
  }

  req.session.userId = user.id;

  res.send('You are signed in');
})

app.listen(3000, () => {
  console.log('Listening on Port 3000 http://localhost:3000/signup ....')
})