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