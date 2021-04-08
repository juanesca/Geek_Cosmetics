const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(cors());

app.set("port", procces.env.PORT);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(require('./routes/routes'));




app.listen(app.get("port"), () => {
    console.log(`Server running`);
})