var express = require('express');
var router = express.Router();

// controllers
var contact_controller = require('../controllers/contactController');

// contact routes
router.get('/contact', function(req, res, next) {
    res.redirect('/manager');
});

// GET: default root index
router.get('/', contact_controller.index);

// GET: create contact 
router.get('/contact/create', contact_controller.contact_create_get);

// POST: create contact
router.post('/contact/create', contact_controller.contact_create_post);

// GET: delete contact
router.get('/contact/:id/delete', contact_controller.contact_delete_get);

// POST: update contact
router.post('/contact/:id/delete', contact_controller.contact_delete_post);

// GET: update contact
router.get('/contact/:id/update', contact_controller.contact_update_get);

// POST: update contact
router.post('/contact/:id/update', contact_controller.contact_update_post);

// GET: a specific contact
router.get('/contact/:id', contact_controller.contact_detail);

module.exports = router;