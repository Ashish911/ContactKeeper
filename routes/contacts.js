const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check'); 

// const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Get all user contacts
// @access  Private
router.get('/', auth , async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date : -1 });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Send Error');
    }
});

// @route   POST api/contacts
// @desc    Add new contacts
// @access  Private
router.post('/', [auth, [
    check('name', 'Name is required')
        .not()
        .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();

        res.json(contact);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/contacts/:id
// @desc    Update contacts
// @access  Private
router.put('/:id', [
    check('name', 'Name is required')
        .not()
        .isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const contacts = await Contact.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.send('Contact Updated');
        res.status(200).json({ data: contacts });
    } catch(err) {
        if (!err) {
            return res.status(500).send('Server Error');
        }
    }
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.send('Contact Deleted');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;