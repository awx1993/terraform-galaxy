const axios = require('axios');

async function fetchTerraformModules(provider) {
  const url = `https://registry.terraform.io/v1/modules?provider=${provider}`;
  const response = await axios.get(url);
  return response.data.modules;
}

// Usage
const awsModules = await fetchTerraformModules('aws');