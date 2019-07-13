#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Contact = require('./models/contact');


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var contacts = []

function contactCreate(first_name, last_name, e_email, p_phone_number, n_notes, cb) {
  contactdetail = {first_name:first_name , last_name: last_name }
  if (e_email != false) contactdetail.email = e_email
  if (p_phone_number != false) contactdetail.phone_number = p_phone_number
  if (n_notes != false) contactdetail.notes = n_notes
  
  var contact = new Contact(contactdetail);
       
  contact.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Contact: ' + contact);
    contacts.push(contact)
    cb(null, contact)
  }  );
}

function createContacts(cb) {
    async.series([
        function(callback) {
          contactCreate('Patrick', 'Rothfuss', 'patrick_rothfuss@gmail.com', '778-778-7778', 'User1', callback);
        },
        function(callback) {
          contactCreate('Ben', 'Bova', 'ben_bova@gmail.com', '778-778-7788', false, callback);
        },
        function(callback) {
          contactCreate('Isaac', 'Asimov', 'isaac_asimov@gmail.com', '1778-788-7888', 'User3', callback);
        },
        ],
        // optional callback
        cb);
}

async.series([
    createContacts
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Contact: '+contacts);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




