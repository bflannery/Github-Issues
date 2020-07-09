import React from 'react';
import { useSelector } from "react-redux";
import Issue from "./Issue";

const IssuesList = () => {
    const issues = useSelector(state => state.issues.issues)
    return (
        <div>
            <ul>
                {Object.values(issues).map(issue => <Issue key={issue.id} issue={issue} />)}
            </ul>
        </div>
    )
}

export default IssuesList
