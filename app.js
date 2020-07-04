function compare(a, b) {
    if (a.orderCount > b.orderCount) {
        return -1;
    }
    if (a.orderCount < b.orderCount) {
        return 1;
    }

    //a equals b
    return 0;
}
//use express module in file
const express = require('express');
//Use handlebars.js module
const exphbs = require('express-handlebars');
const app = express();
const meals = require('./meals');
const favOrders = require('./favOrders');
const bParser = require('body-parser');
const valid = require('./validation');
const multer = require('multer');
//use nodemailer to send emails
const nodemailer = require('nodemailer');
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
        },
        popOrder: (context, options) => {
            return (context > 14) ? true : false;

        }
    }
}));

//files with .hbs extension uses template engine .hbs
app.set('view engine', '.hbs');
const HTTP_PORT = process.env.port || 8080;




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
app.get('/log', (req, res) => {
    res.render('log', {
        cEm: false,
        cPa: false
    });
})
app.get('/reg', (req, res) => {
    res.render('reg', {

    });
})

app.use(bParser.urlencoded({
    extended: false
}));
app.post("/log", (req, res) => {
    valid.login(req.body).then(() => {
        res.redirect("/meal_packages");
    }).catch((inData) => {
        res.render('log', {
            email: inData.email,
            pass: inData.pass,
            cEm: inData.emailErr,
            cPa: inData.passErr
        });

    });
});
app.post("/reg", (req, res) => {
    valid.register(req.body).then(() => {
        res.render('dashboard', {
            Name: req.body.first + " " + req.body.last,
            data: favOrders.packages.sort(compare)
        });
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'quickfreshmeals@gmail.com',
                pass: 'A!#19Newnham'
            }
        });
        let mailHeader = {
            from: 'quickfreshmeals@gmail.com',
            to: req.body.email,
            subject: "Welcome to Quick Fresh Meals",
            html: `<img src="https://i.ibb.co/ZcMFyTB/logo-transparent.png"  style="display: block; margin-right: auto; margin-left: auto; height: 200px;"><h2 style="font-size:2em; text-align: center; color:#111d5e">Welcome to Quick Fresh Meals</h2>
            <p style="font-size:1.5em; color:#111d5e; margin-left: auto; margin-right:auto; text-align: center;">Thank you for registering your account at Quick Fresh Meals.\n
            Your account username is ${req.body.email} and your password is
            ${req.body.pass}</p>`
        };
        transporter.sendMail(mailHeader, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }).catch((inData) => {
        res.render('reg', {
            phone: inData.phone,
            cPh: inData.phoneErr,
            email: inData.email,
            cE: inData.emailErr,
            passOne: inData.pass,
            passTwo: inData.passConfirm,
            cPone: inData.passErr,
            cPtwo: inData.passConfirmErr,
            cF: inData.firstErr,
            cL: inData.lastErr,
            first: inData.first,
            last: inData.last
        });
    });
});
//route for submission of registration form


//Serve all static image files in the folder Assets
app.use(express.static('./Assets'));
//for client errors
app.use((req, res, next) => {
    res.status(404).send("Sorry, Page Not Found! Try another route.")
})

//Start the server for listening on HTTP_PORT
app.listen(HTTP_PORT, '0.0.0.0');