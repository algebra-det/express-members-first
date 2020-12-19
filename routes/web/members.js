const express = require('express');
const router = express.Router();
const members = require('../Members')

router.get('/', (req, res) => res.render('index', {
    title: "Index Via router in members.js",
    members
}))

module.exports = router