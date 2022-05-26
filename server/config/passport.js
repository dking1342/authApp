import { Strategy } from "passport-google-oauth20";
import User from "../models/User.js";

export default function GooglePassport (passport) {
  passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (_, __, profile, done) => {
    const newUser = { 
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value
    }
    try {
      let user = await User.find({ googleId: profile.id });
      if(user.length){
        done(null, user);
      } else {    
        user = await User.create(newUser);
        done(null, user);   
      }
    } catch (error) {
      done(error);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

}