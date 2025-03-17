const express= require('express');
const app= express();
require('dotenv').config();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Welcome to the blog apis !');
})

require('./config/db');

app.use('/api/users', require('./routes/user'));
app.use('/api/posts', require('./routes/post'));

const port= process.env.PORT || 4000

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});