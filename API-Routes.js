// server.js
const express = require('express');
const mongoose = require('mongoose');

// Connect to AWS MongoDB Atlas
mongoose.connect('mongodb+srv://<user>:<pass>@cluster0.mongodb.net/terraform-galaxy');

// User Subscription Model
const User = mongoose.model('User', { email: String, provider: String });

app.post('/subscribe', async (req, res) => {
  const user = new User({ email: req.body.email, provider: req.body.provider });
  await user.save();
  res.status(201).send('Subscribed!');
});
