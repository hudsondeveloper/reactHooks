import React, { useState, useEffect } from "react";
import "./app.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(async () => {
    const response = await fetch(
      "http://api.github.com/users/hudsondeveloper/repos"
    );
    const data = await response.json();
    setRepositories(data);
  }, []);

  function handleFavorite(id) {
    const newRepositores = repositories.map((repo) => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });

    setRepositories(newRepositores);
  }

  useEffect(() => {
    const filtered = repositories.filter((repo) => repo.favorite);
    document.title = `Você tem ${filtered.length} FAVORITOS`;
  }, [repositories]);

  return (
    <>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id} className="lista">
            {repo.id} : {repo.name}
            {repo.favorite && <span> - Favorito -</span>}
            <button className="botão" onClick={() => handleFavorite(repo.id)}>
              Favoritar
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
