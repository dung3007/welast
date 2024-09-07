import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RepoDetail({ repo }) {
  const [commitData, setCommitData] = useState(null);

  useEffect(() => {
    if (repo) {
      axios.get(`https://api.github.com/repos/${repo.full_name}/commits`)
        .then(response => setCommitData(response.data[0]))
        .catch(error => console.error('Error fetching commits:', error));
    }
  }, [repo]);

  if (!repo) return null;

  return (
    <div>
      <h1>{repo.name}</h1>
      {commitData && (
        <div>
          <p>Date: {commitData.commit.author.date}</p>
          <p>Author: {commitData.commit.author.name}</p>
          <p>Message: {commitData.commit.message}</p>
        </div>
      )}
    </div>
  );
}

export default RepoDetail;
