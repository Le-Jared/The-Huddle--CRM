const express    = require("express"),
router			 = express.Router();

// Schemas
const User		  = require ("../models/user");
Job 	   		  = require ("../models/job");
Client 			  = require ("../models/client");

// Functions
let isLoggedIn = require("../bin/userPermissions/isLoggedIn");
let isAdministrator = require("../bin/userPermissions/isAdministrator");
let isAdministratorOrCurrentUser = require("../bin/userPermissions/isAdministratorOrCurrentUser");

router.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

require('dotenv').config();

// ========================================================================== index
router.get("/", isLoggedIn, isAdministrator, async function(req, res){
	users = [];
	try {
		users = await User.find({});
	}
	catch (err) {console.log(err);}
	res.render("users/users", {users: users});
});

// ========================================================================== User Permissions
router.get("/user_permissions", isLoggedIn, isAdministrator, async function(req, res){
	res.render("users/user_permissions");
});

// ========================================================================== new
router.get("/add", isLoggedIn, isAdministrator, function(req, res){
	res.render("users/add_user");
})

// ========================================================================== show
router.get("/:id", isLoggedIn, isAdministratorOrCurrentUser, async function(req, res){
		user = {};
		try {
			user = await User.findById(req.params.id);
		}
		catch (err) {console.log(err);}
		return res.render("users/user", {user: user});
});

// ========================================================================== edit
router.get("/:id/edit", isLoggedIn, isAdministratorOrCurrentUser, async function(req, res){
	user = {};
	try {
		user = await User.findById(req.params.id);
	}
	catch (err) {console.log(err);}
	res.render("users/edit_user", {user: user});
});

// ========================================================================== create
router.post("/", isLoggedIn, isAdministrator, async function(req, res){ 
	let users = [];
	let user = {};
	let newUser = new User({
		username: req.body.user["username"],
		first_name: req.body.user["first_name"],
		middle_name: req.body.user["middle_name"],
		last_name: req.body.user["last_name"],
		email_address: req.body.user["email_address"],
		phone_number: req.body.user["phone_number"],
		street: req.body.user["street"],
		city: req.body.user["city"],
		state: req.body.user["state"],
		zip: req.body.user["zip"],
		user_permissions: req.body.user["user_permissions"],
	});

	users = await User.find({ username: { $eq: newUser.username }});
	if (users.length > 0){	
		console.log("Error: User Already Exists");
		req.flash("error", "Username already exists")
		return res.redirect("/users/add");
	}

	// If username does not exist
	try {
		user = await User.register(newUser, req.body.user["password"]);
		console.log("New user " + "'" + newUser.username + "'" + " created");
	}
	catch (err) {console.log(err);}	

	
	req.flash("success", "New user has been created");
	res.redirect("/users");
});

// ========================================================================== update
router.put("/:id", isLoggedIn, isAdministratorOrCurrentUser, async function(req, res){ 
	let user = {};

	try {
		user = await User.findByIdAndUpdate(req.params.id, req.body.user);
		console.log("User " + "'" + req.body.user["username"] + "'" + " has been updated")
	}
	catch (err) {console.log(err);}	

	
	req.flash("info", "User has been updated");
	res.redirect("/users/" + req.params.id);
});

// ========================================================================== delete
router.delete("/:id", isLoggedIn, isAdministratorOrCurrentUser, async function(req, res){ 
	try {
		await User.findByIdAndRemove(req.params.id);
		console.log("User has been deleted");
	}
	catch (err) {console.log(err);}	
	req.flash("error", "User has been deleted");
	res.redirect("/users");
});

// ========================================================================== edit password
router.get("/:id/edit_password", isLoggedIn, isAdministratorOrCurrentUser, async function(req, res){
		user = {};
		try {
			user = await User.findById(req.params.id);
		}
		catch (err) {console.log(err);}
		res.render("users/edit_user_password", {user: user});
});

// ========================================================================== update password
router.put("/:id/edit_password", isLoggedIn, isAdministratorOrCurrentUser, async function(req, res){ 
		user = {};
		try {
			user = await User.findById(req.params.id)
		}
		catch (err) {console.log(err);}	
		
		user.authenticate(req.body.user["old_password"], async function(err, model, passwordError){
			if(passwordError){
				req.flash("error", "Old password entered was incorrect");
				res.redirect("/users/" + req.params.id + "/edit_password");
			} else if (model) {
				try {
					await user.changePassword(req.body.user["old_password"], req.body.user["new_password"]);
					console.log("User " + "'" + user.username + "'" + " password has been changed");
				}
				catch (err) {console.log(err);}	


				req.flash("info", "User password been updated");
				res.redirect("/users/" + req.params.id);
			} else
			{
				console.log(err);
				res.redirect("/users/" + req.params.id);
			}
		});
});
	
module.exports = router;