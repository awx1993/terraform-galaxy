# Deploy Frontend (Amplify)
amplify add hosting
amplify publish

# Deploy Backend (EC2)
scp -i key.pem server.js ec2-user@IP:/home
ssh ec2-user@IP "node server.js"


# Step 5: Deployment (AWS)

Service: Usage
AWS Amplify	Host Next.js frontend
EC2	Backend API (Node.js)
Route 53	Custom domain (terraform-galaxy.com)