const express = require("express");
const router = express.Router();
const User = require("./../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../key.js");
const { EMAIL_KEY } = require("../key.js");
const { BHANDU_KEY } = require("../key.js");
const requireLogin = require("../middleware/requireLogin");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

router.get("/protected", requireLogin, (req, res) => {
  res.send("hello user");
});
router.post("/register", (req, res) => {
  console.log(req.body);
  const {
    name,
    email,
    password,
    mobileNo,
    country,
    gender,
    birthday,
  } = req.body;

  if (!email || !password || !name) {
    return res.json({ error: "please add everything" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.json({ error: "user already exists with that email" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          name,
          mobileNo,
          country,
          gender,
          birthday,
        });
        user
          .save()
          .then((user) => {
            const msg = {
              to: user.email, // Change to your recipient
              from: "vishwasagrawal2001@gmail.com", // Change to your verified sender
              subject: "Signin success",
              html: `<h1>Thanks for Signing up in our website  click this link to verify your account http://localhost:3000/confirmation/${user._id} </h1>`
            };
            sgMail
              .send(msg)
              .then(() => {
                console.log("Email sent");
              })
              .catch((error) => {
                console.error(error);
              });
            res.json({ message: "hello great success again" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "please provide email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or Password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({message:"successfully signed in"})
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email, isVerified } = savedUser;
          res.json({ token, user: { _id, name, email , isVerified } });
          console.log(token);
        } else {
          return res.status(422).json({ error: "Invalid password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
router.get("/profile/:id",requireLogin, (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id)     
    .select("-password")
    .then((savedUser) => {
      console.log(savedUser);
      const {
        name,
        email,
        password,
        mobileNo,
        country,
        gender,
        birthday,
        __id,
        favoriteMovies
      } = savedUser;
      res.json({
        user: {
          name,
          email,
          password,
          mobileNo,
          country,
          gender,
          birthday,
          __id,
          favoriteMovies
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/like", (req, res) => {
  const { __id,moviephoto } = req.body;  
  const movieid = req.body.movieid.toString();
  console.log(__id,movieid,moviephoto);
 
  console.log(typeof(movieid));
  User.findOne({ _id: __id }).then((savedUser) => {
    if (savedUser.favoriteMovies.find(x=> x.movieid===movieid)) {
      User.findOneAndUpdate(
        { _id: __id },
        { $pullAll: { favoriteMovies: [{movieid,moviephoto}] } },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.json({ user: result });
          }
        }
      )
    } else {
      User.findOneAndUpdate(
        { _id: __id },
        { $addToSet: { favoriteMovies: [{movieid,moviephoto}] } },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.json({ user: result });
          }
        }
      );
    }
  }).catch((err)=>console.log(err));
});
router.get("isliked/:id/:movieid",(req,res)=>{
  User.findById(req.params)

})
router.post("/verify/:id",(req,res)=>{
 console.log(req.params.id)
 const _id=req.params.id;
  User.findOne({ _id: _id }).then((savedUser) => {
        
      User.findOneAndUpdate(
        { _id: _id },
        { $set: {isVerified: true} },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.json({ user: result });
          }
        }
      )
    
  }).catch((err)=>console.log(err));
 
})

module.exports = router;
