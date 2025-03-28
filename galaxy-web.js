import { Amplify, Auth } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    userPoolId: 'YOUR_USER_POOL_ID',
    userPoolWebClientId: 'YOUR_APP_CLIENT_ID',
  },
});

// Sign up
await Auth.signUp({ username: 'user@example.com', password: 'Secure123!' });

// Login
await Auth.signIn('user@example.com', 'Secure123!');