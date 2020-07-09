import React from 'react';
import PropTypes from 'prop-types'

const Issue = ({ issue }) => {
    return (
        <li key={issue.id}> {issue.title}</li>
    )
}

export default Issue

Issue.propTypes = {
    issue: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
    })
}

