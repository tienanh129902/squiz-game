const httpStatus = require('http-status');
const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { playService, userService } = require('../services');

/**
 * Get all questions
 */
const getAllQuestions = catchAsync(async (req, res) => {
    const options = pick(req.query, ['order', 'size', 'page']);
    const question = await playService.getAllQuestions(options);
    res.status(httpStatus.OK).send(question);
});

/**
 * Submit  questions
 */
const submitQuestions = catchAsync(async (req, res) => {
    const user = await userService.getUserByPk(req.user.userID);
    const totalScore = await playService.submitQuestion(user,req.body);
    res.status(httpStatus.OK).send({ totalScore });
});

module.exports = {
    getAllQuestions,
    submitQuestions
};
