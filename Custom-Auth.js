const jwt = require('jsonwebtoken');
const User = require('./models/User');

// Login endpoint
app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send('User not found');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).send('Invalid password');

  const token = jwt.sign({ _id: user._id }, 'YOUR_SECRET_KEY');
  res.header('Authorization', token).send(token);
});