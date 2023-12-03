import express from "express";
import { Review } from "../models/Review.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.rating) {
      return res.status(400).send({
        message: "Send all required fields: title, author, rating",
      });
    }
    const newReview = {
      title: req.body.title,
      author: req.body.author,
      rating: req.body.rating,
      image: req.body.image,
    };

    const review = await Review.create(newReview);

    return res.status(201).send(review);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({});

    return res.status(202).json({
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    return res.status(202).json(review);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Review.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Review not found" });
    }

    return res.status(200).send({ message: "Review deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
