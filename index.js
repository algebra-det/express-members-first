const express = require("express");
const path = require("path");
const logger = require("./middleware/logger")
const exphbs = require('express-handlebars');

const app = express();

// Init Middleware
app.use(logger);


// Use Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Body Parser should be called before any controller or using routes, views, api calls




// HomePage Route
// app.get('/', (req, res) => res.render('index', {
//     title: 'Member App is the title!'
// }))
app.use('/', require('./routes/web/members'));


// Members API Routes
app.use('/api/members', require('./routes/api/members'));






// Set static folder
app.use(express.static(path.join(__dirname, "public")));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



// As we also have static folder which automatically renders 'index.html' on '/'
// if we put app.get('/') above our Static Use declaration
// express will use the app.get('/')
// elif we use static Use declaration above app.get('/')
// express will use static folder route