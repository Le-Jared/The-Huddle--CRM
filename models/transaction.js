// Schemas
const Transaction = require ("./transaction");
User 			  = require ("./user");
Job 	   		  = require ("./job");
Client 			  = require ("./client");

mongoose          = require("mongoose");


// =======================Transaction Schema

const transactionSchema = new mongoose.Schema({
	job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
	client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
	deposited_by_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	transaction_info: {
	  associated_name: { type: String, required: true, maxlength: 50 },
	  amount: { type: mongoose.Decimal128, required: true, min: 0 },
	  method: { type: String, required: true },
	  receipt_number: { type: String, required: true, maxlength: 50 },
	  date: { type: Date, required: true }
	},
	billing_address: {
	  street: String,
	  country: String,
	  city: String,
	  zip: String
	},
	notes: String,
	date_added: { type: Date, default: Date.now, required: true }
  });
  

module.exports = mongoose.model("Transaction", transactionSchema);