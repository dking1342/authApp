import express from "express";
import { ensureAuth, ensureGuest } from "../middleware/auth.js";
import Story from "../models/Story.js";
export const router = express.Router();


// @desc    login/landing page
// @route   GET /
router.get("/", ensureGuest, (_, res) => {
  res.render("login", {
    layout: "login"
  });
})

// @desc    dashboard
// @route   GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  let firstName, id;
  if(Array.isArray(req.user)){
    let { firstName: userName, _id: userId } = req.user[0];
    firstName = userName;
    id = userId;
  } else {
    let { firstName: userName, _id: userId } = req.user;
    firstName = userName;
    id = userId;
  }

  try {
    const stories = await Story.find({ user: id}).lean();
    res.render("dashboard",{
      name: firstName,
      stories
    });
  } catch (error) {
      console.error(error);
      res.render("error/500");
  }

})