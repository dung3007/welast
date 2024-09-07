const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());

app.get('/repos', async (req, res) => {
  try {
    const response = await axios.get('https://api.github.com/users/freeCodeCamp/repos');
    const repos = response.data;

    const filteredRepos = repos.filter(repo => !repo.fork && repo.forks > 5);

    res.json(filteredRepos);
  } catch (error) {
    res.status(500).send('Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
