import React from 'react';
import PropTypes from 'prop-types'
import {useDispatch} from "react-redux";
import {fetchRepoIssuesAction} from "../actions/issues";

const Repo = ({ repo }) => {
    const dispatch = useDispatch()

    const handleOnClick = () => {
        dispatch(fetchRepoIssuesAction(repo.full_name))
    }

    return (
        <li
            className="repos__repo"
            key={repo.id}
            onClick={handleOnClick}
        >
            {repo.name}
        </li>
    )
}

export default Repo

Repo.propTypes = {
    repo: PropTypes.shape({
        id: PropTypes.number,
        full_name: PropTypes.string
    })
}

