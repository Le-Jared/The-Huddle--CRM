const Transaction = require ("./transaction"),
User 			  = require ("./user"),
Job 	   		  = require ("./job"),
Client 			  = require ("./client"),
	  
mongoose          = require("mongoose");

// =======================Client Schema

var clientSchema = new mongoose.Schema({
    organization_name: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email_address: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                // This regex checks if the email format is valid
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: '{VALUE} is not a valid email address!'
        }
    },
    phone_number: {
        type: String,
        validate: {
            validator: function(v) {
                // This regex checks if the phone number format is valid
                return /^\d{10}$/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        }
    },
    street: String,
    country: String,
    city: String,
    zip: String,
    description: String,
    active: {
        type: Boolean,
        default: true
    },
    date_added: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    }],
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    }]
});

module.exports = mongoose.model("Client", clientSchema);