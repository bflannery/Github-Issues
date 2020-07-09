import React from 'react';
import { useSelector } from "react-redux";
import Repo from "./Repo";

const ReposList = () => {
    const repos = useSelector(state => Object.values(state.repos.repos) || [] )
    return (
        <div>
            <ul>
                {repos.map(repo => <Repo key={repo.id} repo={repo} />)}
            </ul>
        </div>
    )
}

export default ReposList
