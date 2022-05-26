import express from "express";
import passport from "passport";

export const authRouter = express.Router();

// @desc    auth with google
// @route   GET /auth/google
authRouter.get("/google", passport.authenticate("google", { scope: ['profile'] }));

// @desc    google auth callback
// @route   GET /auth/google/callback
authRouter.get(
  "/google/callback", 
  passport.authenticate("google", { failureRedirect: "/" }),
  (_, res) => {
    res.redirect("/dashboard");
  }
);

// @desc    logout user
// @route   GET /auth/logout
authRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if(err) return err;
    res.redirect("/");
  });
});
