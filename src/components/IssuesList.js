import React from 'react';
import Issue from "./Issue";

const IssuesList = ({ issues }) => (
    <div className="issues__list-container">
        <ul className="issues__list">
            {Object.values(issues).map(issue => <Issue key={issue.id} issue={issue} />)}
        </ul>
    </div>
)

export default IssuesList
