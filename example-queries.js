// Save a user
const user = new User({
    email: 'dev@example.com',
    password: await bcrypt.hash('password123', 10),
    providers: ['aws']
  });
  await user.save();
  
  // Find users interested in AWS
  const awsUsers = await User.find({ providers: 'aws' });