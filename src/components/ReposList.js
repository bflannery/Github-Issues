import React from 'react';
import Repo from "./Repo";

const ReposList = ({ repos }) => (
    <div className="repos__list-container">
        <ul className="repos__list">
            {repos.map(repo => <Repo key={repo.id} repo={repo} />)}
        </ul>
    </div>
)

export default ReposList
