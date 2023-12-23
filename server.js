require('dotenv').config();

const express = require('express');
const app = express();

app.listen(process.env.PORT, () => console.log(`server listening at port ${process.env.PORT}`));