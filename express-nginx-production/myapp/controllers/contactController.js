// require contact mongoose model
var Contact = require('../models/contact');
// do tasks in parallel
var async = require('async');
// validate and sanitize input data
const { body } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const { validationResult } = require('express-validator');
// format errors
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return `${location} [${param}]: ${msg}`;
};

exports.index = function(req, res, next) {
    async.parallel({
        contact_count: function(callback) {
            Contact.countDocuments({}, callback);
        }, 
        contact_list: function(callback) {
            Contact.find()
                .sort({ fisrt_nmae: 'ascending'})
                .exec(callback);
        }
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        res.render('index', { title: 'Personal Contact Manager', error: err, data: results });
    });
}

// show detail page of a contact
exports.contact_detail = function(req, res, next) {
    Contact.findById(req.params.id)
        .exec(function(err, detail_contact) {
            if (err) {
                return next(err);
            }
            if (detail_contact == null) {
                var err = new Error('Contact not found');
                err.status = 404;
                return next(err);
            }
            res.render('contact_detail', { contact_detail: detail_contact });
    });
};

// show contact create form on GET.
exports.contact_create_get = function(req, res, next) {
    res.render('contact_form', { title: 'Create New Contact', submit_button_name: 'Create'});
};

// handle contact create on POST.
exports.contact_create_post = [

    // validate the first name field and last name field is not empty and must be non-alphanumeric characters
    body('first_name').isLength({ min: 1 }).trim().withMessage('First name must not be empty.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('last_name').isLength({ min: 1 }).trim().withMessage('Last name must not be empty.')
        .isAlphanumeric().withMessage('Last name has non-alphanumeric characters.'),
    // validate email and phone format
    body('email')
        .if((value, { req }) => req.body.email)
        .isEmail().withMessage('Please enter the email in correct format.'),
    body('phone_number')
        .if((value, { req }) => req.body.phone_number)
        .isMobilePhone().withMessage('Please enter the phone number in correct format.'),
    // sanitization
    sanitizeBody('first_name').escape(),
    sanitizeBody('last_name').escape(),
    sanitizeBody('email').escape(),
    sanitizeBody('phone_number').escape(),
    sanitizeBody('notes').escape(),

    // process post request
    (req, res, next) => {
        // validate erros
        const errors = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            res.render('contact_form', { title: 'Create New Contact', submit_button_name: 'Create', contact: req.body, errors: errors.array() });
            return;
        } else {
            var contact = new Contact(
                { 
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    phone_number: req.body.phone_number,
                    notes: req.body.notes
                }
            );
            contact.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/');
            });
        }
    }
];

// show contact delete form on GET.
exports.contact_delete_get = function(req, res, next) {
    Contact.findById(req.params.id)
        .exec(function(err, detail_contact) {
            if (err) {
                return next(err);
            }
            if (detail_contact == null) {
                var err = new Error('Contact not found');
                err.status = 404;
                return next(err);
            }
            res.render('contact_delete', { contact_detail: detail_contact });
        });
};

// handle contact delete on POST.
exports.contact_delete_post = function(req, res, next) {
    Contact.findById(req.params.id)
        .exec(function(err, detail_contact) {
            if (err) {
                return next(err);
            }
            if (detail_contact == null) {
                var err = new Error('Contact not found');
                err.status = 404;
                return next(err);
            } else {
                Contact.findByIdAndRemove(req.body.id, function deleteContact(err) {
                    if (err) { return next(err); }
                    res.redirect('/');
                });
            }
        });
};

// show contact update form on GET.
exports.contact_update_get = function(req, res, next) {
    Contact.findById(req.params.id)
        .exec(function(err, detail_contact) {
            if (err) {
                return next(err);
            }
            if (detail_contact == null) {
                var err = new Error('Contact not found');
                err.status = 404;
                return next(err);
            }
            res.render('contact_form', { title: 'Update Existing Contact', submit_button_name: 'Update', contact: detail_contact });
        });
};

// handel contact update on POST.
exports.contact_update_post = [
    // validate the first name field and last name field is not empty and must be non-alphanumeric characters
    body('first_name').isLength({ min: 1 }).trim().withMessage('First name must not be empty.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('last_name').isLength({ min: 1 }).trim().withMessage('Last name must not be empty.')
        .isAlphanumeric().withMessage('Last name has non-alphanumeric characters.'),
    // validate email and phone format
    body('email')
        .if((value, { req }) => req.body.email)
        .isEmail().withMessage('Please enter the email in correct format.'),
    body('phone_number')
        .if((value, { req }) => req.body.phone_number)
        .isMobilePhone().withMessage('Please enter the phone number in correct format.'),
    // sanitization
    sanitizeBody('first_name').escape(),
    sanitizeBody('last_name').escape(),
    sanitizeBody('email').escape(),
    sanitizeBody('phone_number').escape(),
    sanitizeBody('notes').escape(),

    // process post request
    (req, res, next) => {
        // validate erros
        const errors = validationResult(req).formatWith(errorFormatter);

        var contact = new Contact(
            { 
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone_number: req.body.phone_number,
                notes: req.body.notes,
                _id: req.params.id
            }
        );

        if (!errors.isEmpty()) {
            res.render('contact_form', { title: 'Update Existing Contact', submit_button_name: 'Update', contact: contact, errors: errors.array() });
            return;
        } else {
            Contact.findByIdAndUpdate(req.params.id, contact, {}, function updateContact(err) {
                if (err) { return next(err); }
                res.redirect('/');
            });
        }
    }
];