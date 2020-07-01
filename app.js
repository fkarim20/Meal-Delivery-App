//use express module in file
const express = require('express');
//Use handlebars.js module
const exphbs = require('express-handlebars');
const app = express();
const meals = require('./meals');
app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers: {
        count: function (context, options) {
            let selected = false;
            if (context <= 2) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },
        isdefined: function (value) {
            return value === 3;
        }
    }
}));

//files with .hbs extension uses template engine .hbs
app.set('view engine', '.hbs');
const HTTP_PORT = process.env.port || 8080;

function onStart() {
    console.log("We will be listening for requests on port:" + HTTP_PORT);

}


//route for homepage
app.get('/', (req, res) => {
    res.render('home', {
        data: meals.packages
    });

})
app.get('/home', (req, res) => {
    res.render('home', {
        data: meals.packages,
    });
})

//route to for meal packages
app.get('/meal_packages', (req, res) => {
    res.render('meal_packages', {
        data: meals.packages
    });
})


//Serve all static image files in the folder Assets
app.use(express.static('./Assets'));
//for client errors
app.use((req, res, next) => {
    res.status(404).send("Sorry, Page Not Found! Try another route.")
})

//Start the server for listening on HTTP_PORT
app.listen(HTTP_PORT, onStart);