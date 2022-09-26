const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <div>
      <form method = "POST">
        <input name = "email" placeholder="email" />
        <input name = "fName" placeholder="fName" />
        <input name = "lName" placeholder="lName" />
        <input name "dob" placeholder="DOB" />
        <button> Sign Up </button>
      </form>
    </div>
  `);
});

app.post('/', (req, res) => {
  //get access to user-provided info
  req.on('data', data => {
    console.log(data)
  })
  res.send('Account created!')
});

app.listen(3000, () => {
  console.log('Listening....')
})