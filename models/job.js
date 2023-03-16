const Transaction = require ("./transaction");
User 			  = require ("./user");
Job 	   		  = require ("./job");
Client 			  = require ("./client");

mongoose          = require("mongoose");

// =======================Job Schema

const jobSchema = new mongoose.Schema({
	job_name: { type: String, required: true, maxlength: 50 },
	created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	street: String,
	country: String,
	city: String,
	zip: String,
	description: String,
	billing_price: { type: mongoose.Decimal128, required: true, min: 0 },
	client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
	transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
	start_date: {
	  type: Date,
	  default: null
	},
	end_date: {
	  type: Date,
	  default: null,
	  validate: {
		validator: function(v) {
		  return v == null || v instanceof Date;
		},
		message: 'Invalid date format'
	  }
	},
	date_added: { type: Date, default: Date.now, required: true }
  });

module.exports = mongoose.model("Job", jobSchema);