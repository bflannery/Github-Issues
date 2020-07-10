import React from 'react';
import PropTypes from 'prop-types'
import avatarPlaceholder from '../static/avatar.png'

const Issue = ({ issue }) => {
    console.log({ issue })
    const { assignee,  } = issue
    const avatarSrc = (
        assignee !== null && assignee.hasOwnProperty('avatar_url')
            ? assignee.avatar_url
            : avatarPlaceholder
    )
    return (
        <li
            className="issues__issue"
            key={issue.id}
        >
            <img
                className="issues__issue-assignee-img"
                src={avatarSrc}
                alt="assignee-avatar"
            />
            <h4
                className="issues__issue-title"
            >
                {issue.title}
            </h4>
            <h6>{issue.created_at}</h6>
            <h6>{issue.updated_at}</h6>
        </li>
    )
}

export default Issue

Issue.propTypes = {
    issue: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
    })
}

