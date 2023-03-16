# The-Huddle
A simple Web-based Client Relationship Management application that uses back-end and front-end technologies. I created this as an ambitious second project for my General Assembly BootCamp. 

[Click here](https://poised-coveralls-cow.cyclic.app/) to see it in action

- Username: Admin
- Password: Password

## General Info
This is a simple CRM application that uses a Node server and MongoDB database to display various information to a small business about their client relations.  Features of this application include:
* Three different User Permission Levels
* Associated databases for easy relationship management
* Datatables and charts.js on the front-end for easy visual views of information
* Mobile-friendly design

## Users' Stories

| As a ...  | I want ...  | Feature
| :-------- |:------------|:---------
| User | to login/register/logout | Authentication (Security)/POST Request
| User | to change password | PUT Request with Password Hashing
| User | to have an overview of all data through visualisations | Overview of CRM /GET Request
| User | to access page with all Clients | Overview of Categories/GET Request
| User | to add/edit/delete Clients | POST/PUT/DELETE Requests
| User | to access page with all Jobs | Overview of Categories/GET Request
| User | to add/edit/delete Jobs | POST/PUT/DELETE Requests
| User | to access page with all transactions | Overview of Transactions/GET Request
| User | to add/edit/delete transactions | POST/PUT/DELETE Requests
| Admin | to have different authorisation rights for users | Authorisation
| Admin | to create User | Create User Form (Security)/GET Request


## Wireframe
<img width="582" alt="Screenshot 2023-03-16 at 6 11 00 PM" src="https://user-images.githubusercontent.com/68887503/225585178-04f31cc6-fcc0-471f-9c39-c250bf580ec9.png">



<img width="617" alt="Screenshot 2023-03-10 at 1 34 33 PM" src="https://user-images.githubusercontent.com/68887503/224232218-62bfbb81-d14d-48c3-9cde-7b0c08e35b77.png">

## Model
Using the Model-View-Controller approach, the model in this CRUD app exists in the form of a database. The database employed is MongoDB, which is NoSQL in nature. The Entity-Relationship-Diagram (ERD) is shown below for clarity.

## ERD Model
![Screenshot 2023-03-16 at 6 09 21 PM](https://user-images.githubusercontent.com/68887503/225584784-929a3112-033c-401c-a011-66cf764e3405.png)

## View
The views were generated using EJS to dynamically display information passed by the Controller when rendered. 

The views comprise tables to display relevant information to users, such as input fields, and buttons for the user to interact with the application. 

Lastly, EJS partials were used to streamline the code within the views. 

## Controller
There are five categories of controllers namely:client, dashboard,job,transaction and users

The routes for each of these functions adhere to REST conventions.

Passport-Local-Mongoose is used to hash passwords upon creation and login so that the passwords are not stored on the database. Once a user is authenticated after login, express-session is used to authorize them for access to various parts of the app, according to their user account. 

## Technologies
This project was created with
* Back-End:
    * Node.js: 12.18.0
    * Body-parser: 1.19.0
    * Connect-Flash: 0.1.1
    * Connect-mongodb-session: 2.3.3
    * Dotenv: 8.2.0
    * ejs: 3.1.3
    * Express: 4.17.1
    * Express-Session: 1.17.1
    * Memorystore: 1.6.2
    * Method_Override: 3.0.0
    * Moment: 2.26.0
    * Mongoose: 5.9.14
    * Passport: 0.4.1
    * Passport-Local: 1.0.0
    * Passport-Local-Mongoose: 6.0.1

* Front-End:    
    * Bootstrap: 4.3.1
    * Chart.js: 2.8.0
    * Datatables: 1.10.20
    * Font-Awesome: 4.7.0
    * Jquery: 1.12.1
    * Moment: 2.8.4

## To be done in the future
* Add Ticketing System

