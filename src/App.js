import React, { useEffect, useState } from "react";
import "./styles.css";
import api from './services/api';


function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {

    api.get('repositories').then(response => {

      console.log(response);
      setRepositories(response.data);

    }
    )
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {

      title: `Repositório n ${Date.now()}`,
      url: `github.com/${Date.now()}`,
      techs: ['LIndod1', 'linda2']

    })

    const repository = response.data;
    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    repositories.splice(repositoryIndex, 1);

    setRepositories([...repositories]);

    await api.delete(`repositories/${id}`);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {/* <li>
          Repositório 1

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li> */}

        {repositories.map(repository => <li key={repository.id}> {repository.title} <button onClick={() => handleRemoveRepository(repository.id)}>
          Remover
          </button> </li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
