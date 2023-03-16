//  ========================================================Start of Header============================================================
const methodOverride   = require("method-override"),
mongoose         = require("mongoose"),
express          = require("express"),
flash			 = require("connect-flash"),
app              = express();

// Authentication
const passport = require("passport"),
LocalStrategy  = require("passport-local");  

// Schemas
const Transaction = require ("./models/transaction"),
User 			  = require ("./models/user"),
Job 	   		  = require ("./models/job"),
Client 			  = require ("./models/client");

//tell express to serve public directory
app.use(express.static(__dirname + "/public"));

//tell express to look for ejs files
app.set("view engine", "ejs");

// use bodyParser
app.use(express.urlencoded({extended: true}));

// use methodOverride
app.use(methodOverride("_method"));

mongoose.set('useFindAndModify', false);
require('dotenv').config();

mongoose.connect(process.env.MongoDB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
  	serverSelectionTimeoutMS: 5000
}).then (() => {
	console.log("Connected to the database");
}).catch(err => {
	console.log("Error", err.message);
});

// Require Session
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
	uri: process.env.MongoDB,
	collection: 'mySessions'
});

// Catch errors
store.on('error', function(error) {
	console.log(error);
  });

// Create Session
app.use(session ({
	secret: "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.",
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7 * 4// 1 month
	},
	store: store,
	resave: true,
	saveUninitialized: true
}));

// Use Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Use Flash
app.use(flash());

// Use Current Logged in Information and Flashing Information
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	res.locals.info = req.flash("info");
	next();
});

// Functions
let isLoggedIn = require("./bin/userPermissions/isLoggedIn");

//  ========================================================End of Header==============================================================

// Routes
const users  = require("./controllers/users"),
clients 	 = require("./controllers/clients"),
jobs 		 = require("./controllers/jobs"),
transactions = require("./controllers/transactions");
dashboard 	 = require("./controllers/dashboard");

app.use("/users", users);
app.use("/clients", clients);
app.use("/jobs", jobs);
app.use("/transactions", transactions);
app.use(dashboard);

// =======================Login/Register

app.get("/login", function(req, res){
	res.render("login");
});
 
app.post("/login", passport.authenticate("local", {
	successRedirect:"/",
	failureRedirect: "/login",
	failureFlash: true
}), function(req, res){});

// =======================Logout
app.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged Out");
	res.redirect("/login");
});

// =======================Error

app.get("*", isLoggedIn, function(req, res){ 
	res.render("not_found");
});

module.exports = app;