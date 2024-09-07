import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'antd';
import RepoDetail from './DetailRepo';

function App() {
  const [repos, setRepos] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/repos')
      .then(response => setRepos(response.data))
      .catch(error => console.error('Error fetching repos:', error));
  }, []);

  const handleLanguageFilter = (language) => {
    setSelectedLanguage(language);
  };

  const filteredRepos = selectedLanguage
    ? repos.filter(repo => repo.language === selectedLanguage)
    : repos;

  const sortedRepos = filteredRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const languages = [...new Set(repos.map(repo => repo.language))];

  const handleRepoClick = (repo) => {
    setSelectedRepo(repo);
    setIsModalVisible(true);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  return (
    <div>
      <h1>GitHub Repositories</h1>
      <div>
        {languages.map(language => (
          <button key={language} onClick={() => handleLanguageFilter(language)}>
            {language}
          </button>
        ))}
        <button onClick={() => setSelectedLanguage('')}>Show All</button>
      </div>
      <ul>
        {sortedRepos.map(repo => (
          <li key={repo.id} onClick={() => handleRepoClick(repo)}>
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
            <p>Language: {repo.language}</p>
            <p>Forks: {repo.forks}</p>
          </li>
        ))}
      </ul>

      {selectedRepo && (
        <Modal
          title={selectedRepo.name}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Close
            </Button>
          ]}
        >
          <RepoDetail repo={selectedRepo} />
        </Modal>
      )}
    </div>
  );
}

export default App;
