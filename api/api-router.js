const express = require('express');
const postRouter = require("../posts/postRouter");
const userRouter = require("../users/userRouter");

const router = express.Router();


router.use('/posts', postRouter);
router.use('/users', userRouter);

module.exports = router;