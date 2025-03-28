app.get('/modules/aws', async (req, res) => {
    const response = await axios.get('https://registry.terraform.io/v1/modules/aws');
    res.json(response.data);
  });