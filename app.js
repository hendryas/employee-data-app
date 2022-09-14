const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//Config untuk menggunakan JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Memanggil route index.js
const routes = require('./routes')
app.use(routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})