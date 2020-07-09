import React from 'react';
import { useSelector } from "react-redux";
import Repo from "./Repo";

const ReposList = () => {
    const repos = useSelector(state => state.repos.repos)
    return (
        <div>
            <ul>
                {Object.values(repos).map(repo => <Repo key={repo.id} repo={repo} />)}
            </ul>
        </div>
    )
}

export default ReposList
