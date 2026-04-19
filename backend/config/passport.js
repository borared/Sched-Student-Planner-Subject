const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Extract info from Google profile
          const googleId = profile.id;
          const email = profile.emails?.[0]?.value;
          const name = profile.displayName;
          const avatar = profile.photos?.[0]?.value;

          // Check if user already exists by googleId
          let user = await User.findOne({ googleId });

          if (user) {
            // Existing Google user — just return them
            return done(null, user);
          }

          // Check if user exists by email (from email/password signup)
          user = await User.findOne({ email });

          if (user) {
            // Link Google account to existing email/password user
            user.googleId = googleId;
            user.name = user.name || name;
            user.avatar = user.avatar || avatar;
            await user.save();
            return done(null, user);
          }

          // Brand new user — create them
          user = await User.create({
            googleId,
            email,
            name,
            avatar,
          });

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  // Serialize: store user ID in session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize: fetch user from DB using session ID
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).select("-password");
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
