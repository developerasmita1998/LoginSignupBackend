const express = require('express')
const cors = require('cors');
require("./src/utils/config")

const User= require('./src/db/User')

const app = express()
const port = 4000
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("hello");
});



app.get('/test', (req, res) => {
    res.send("hellohjbj");
});


// POST API to create a new user
app.post('/register', async (req, res) => {
    try {
      const data = new User(req.body);
       await data.save();
      res.status(201).json({ message: 'User created successfully',data  });
    } catch (error) {
      res.status(400).json({ message: 'Error creating user', error });
    }
  });



  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email, password });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  });
  
  
   

    

 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})