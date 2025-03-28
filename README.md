# terraform-galaxy
Terrafrom UI 
# Terraform Galaxy - Tech Stack #

Component	Technology
Frontend	React.js (Next.js)
Backend	Node.js (Express)
Database	AWS MongoDB Atlas
Search Engine	Algolia / Elasticsearch
Cloud Hosting	AWS Amplify (Frontend) + EC2 (Backend)
Terraform Modules	GitHub API Integration

# Step 1: Frontend (Next.js) #
<img width="410" alt="image" src="https://github.com/user-attachments/assets/45faae7a-71b2-4b8a-b13c-c445a313df7d" />



# 1.2 Key Features
Search Bar (Algolia Integration)
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';

<InstantSearch indexName="terraform_modules" searchClient={algoliaClient}>
  <SearchBox />
</InstantSearch>
3-Tab Layout (AWS/Azure/GCP)
const [activeTab, setActiveTab] = useState("aws");

<Tabs>
  <Tab onClick={() => setActiveTab("aws")} active={activeTab === "aws"}>AWS</Tab>
  <Tab onClick={() => setActiveTab("azure")}>Azure</Tab>
  <Tab onClick={() => setActiveTab("gcp")}>GCP</Tab>
</Tabs>

# Step 2: Backend (Node.js + Express) #
2.1 API Routes
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

2.2 Terraform Module API
Fetch modules from GitHub using the Terraform Registry API:
app.get('/modules/aws', async (req, res) => {
  const response = await axios.get('https://registry.terraform.io/v1/modules/aws');
  res.json(response.data);
});

#  Step 3: Database (AWS MongoDB Atlas)
1.Set Up MongoDB Atlas

Create a free-tier cluster in AWS MongoDB Atlas.

Whitelist your IP and get the connection string:

2.Define Schema
// models/User.js
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  provider: { type: String, enum: ["aws", "azure", "gcp"] }
});

# Step 4: Search Engine (Algolia)
1.Index Terraform Modules

Use Algolia’s Terraform Module Scraper. https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/

2.Integrate with Frontend
import algoliasearch from 'algoliasearch';
const algoliaClient = algoliasearch('APP_ID', 'API_KEY');

# Step 5: Deployment (AWS)

Service	Usage
AWS Amplify	Host Next.js frontend
EC2	Backend API (Node.js)
Route 53	Custom domain (terraform-galaxy.com)

# Deploy Frontend (Amplify)
amplify add hosting
amplify publish

# Deploy Backend (EC2)
scp -i key.pem server.js ec2-user@IP:/home
ssh ec2-user@IP "node server.js"
UI Design (Figma Mockup)
Color Scheme:

AWS (Orange #FF9900), Azure (Blue #0078D4), GCP (Red #EA4335).

Module Cards:
Module Card

# Final Checklist
✅ Search Bar (Algolia)
✅ 3 Tabs (AWS/Azure/GCP)
✅ User Subscriptions (AWS MongoDB)
✅ Terraform Module API (GitHub/Terraform Registry)
✅ AWS Hosting (Amplify + EC2)

# Part 1: Scraping Terraform Modules

Option A: Official Terraform Registry API (Recommended)
The Terraform Registry has a public API to fetch modules without scraping:

# Get AWS modules (paginated)
https://registry.terraform.io/v1/modules?provider=aws

Example (Node.js):
const axios = require('axios');

async function fetchTerraformModules(provider) {
  const url = `https://registry.terraform.io/v1/modules?provider=${provider}`;
  const response = await axios.get(url);
  return response.data.modules;
}

// Usage
const awsModules = await fetchTerraformModules('aws');

# Option B: Scrape GitHub (If API Limits Exist)
Use Cheerio (Node.js) to scrape Terraform modules from GitHub:

const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeGitHubTerraform(query) {
  const url = `https://github.com/search?q=${query}+terraform+language%3AHCL`;
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);

  const modules = [];
  $('.repo-list-item').each((i, el) => {
    modules.push({
      name: $(el).find('a.v-align-middle').text(),
      url: `https://github.com${$(el).find('a').attr('href')}`,
    });
  });
  return modules;
}

// Usage
const awsModules = await scrapeGitHubTerraform('aws');

# Part 2: User Authentication
Option A: AWS Cognito (Managed Auth)
Set Up Cognito:

Go to AWS Cognito → Create User Pool.

Add app clients (e.g., terraform-galaxy-web).

# Integrate with Frontend:
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

# Option B: JWT + MongoDB (Custom Auth)
1. Backend (Node.js):
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

2. Frontend (React):
3. // Store JWT in localStorage
localStorage.setItem('token', response.data.token);

// Add to API requests
axios.get('/api/modules', {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
});

#  Part 3: Database (AWS MongoDB Atlas)
User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  providers: [{ type: String, enum: ['aws', 'azure', 'gcp'] }],
  createdAt: { type: Date, default: Date.now }
});

Example Queries

// Save a user
const user = new User({
  email: 'dev@example.com',
  password: await bcrypt.hash('password123', 10),
  providers: ['aws']
});
await user.save();

// Find users interested in AWS
const awsUsers = await User.find({ providers: 'aws' });

# Deployment Architecture # 
Frontend (Next.js) → AWS Amplify
Backend (Node.js) → AWS EC2/ECS
Database → MongoDB Atlas (AWS)
Auth → AWS Cognito / JWT
Search → Algolia

## `Troubleshooting Tips ##
1.Terraform API Rate Limits:

Cache responses using Redis.

Use axios-retry for exponential backoff.

2.JWT Security:

Always use HTTPS.

Set short expiration times (e.g., 1h).
3.MongoDB Connection Issues:

Whitelist your IP in Atlas.

Use mongoose.set('debug', true) for logs.

