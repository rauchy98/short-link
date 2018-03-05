'use strict'

const express = require("express");
const linkRouter = express.Router();

const linkController = require('../controllers/shortLinkController');
const verifyToken = require('../verifyToken');

    linkRouter.get('/links', verifyToken.verifyToken, linkController.list_all_links);
    linkRouter.post('/links', verifyToken.verifyToken, linkController.add_link);

    linkRouter.get('/links/:linkId', verifyToken.verifyToken, linkController.get_short_link);
    linkRouter.delete('/links/:linkId', verifyToken.verifyToken, linkController.delete_link);

module.exports = linkRouter;