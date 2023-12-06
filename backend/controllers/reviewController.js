import { Review, Comment } from "../models/Review.js";
import asyncHandler from "express-async-handler";
import { User } from "../models/User.js";
import { Restaurant } from "../models/Restaurant.js";

// @desc Get all reviews
// @route GET /reviews
// @access Public
const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({});
  return res.status(202).json({
    count: reviews.length,
    data: reviews,
  });
});

// @desc Create a review
// @route POST /reviews
// @access Private
const createReview = asyncHandler(async (req, res) => {
  const username = req.user;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  if (!req.body.title || !req.body.rating || !req.body.restaurant) {
    return res.status(400).send({
      message: "Send all required fields: title, rating, restaurant",
    });
  }
  const restaurant_name = req.body.restaurant;
  const restaurant = await Restaurant.findOne({ name: restaurant_name }).exec();
  if (!restaurant) {
    return res.status(400).json({ message: "Restaurant not found" });
  }
  const imageUrl = req.file ? req.file.path : null;
  const newReview = {
    title: req.body.title,
    user: user._id,
    rating: req.body.rating,
    restaurant: restaurant._id,
    imageUrl: imageUrl,
  };
  const review = await Review.create(newReview);
  user.reviews.push(review._id);
  user.save();
  restaurant.reviews.push(review._id);
  restaurant.save();
  return res.status(201).send(review);
});

// @desc Get a single review
// @route GET /reviews/:id
// @access Public
const getReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);
  return res.status(202).json(review);
});

// @desc Create a comment
// @route POST /:review_id/comment
// @access Private
const editReview = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.rating) {
    return res.status(400).send({
      message: "Send all required fields: title, author, rating",
    });
  }
  const { id } = req.params;
  const result = await Review.findByIdAndUpdate(id, req.body);
  if (!result) {
    return res.status(404).send({ message: "Review not found" });
  }
  return res.status(200).send({ message: "Review updated successfully" });
});

// @desc Delete a review
// @route DELETE /reviews/:id
// @access Private
const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await Review.findByIdAndDelete(id);
  if (!result) {
    return res.status(404).send({ message: "Review not found" });
  }
  return res.status(200).send({ message: "Review deleted successfully" });
});

// @desc Create a comment on a review
// @route POST /reviews/:id/comment
// @access Private
const createComment = asyncHandler(async (req, res) => {
  const username = req.user;
  const user = await User.findOne({ username }).select("_id").lean()
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  if (!req.body.text) {
    return res.status(400).send({
      message: "Send all required fields: text",
    });
  }
  const { id } = req.params;
  try {
    const review = await Review.findById(id).select("comments");
    const comment = new Comment({
      user: user._id,
      body: req.body.text,
    });
    var newCommentCount = review.comments.push(comment);
    review.save();
  } catch {
    return res.status(404).send({ message: "Review does not exist" });
  }
  return res
    .status(200)
    .send({ message: "Comment " + newCommentCount + " posted successfully" });
});

export {
  getAllReviews,
  createReview,
  getReview,
  editReview,
  deleteReview,
  createComment,
};
