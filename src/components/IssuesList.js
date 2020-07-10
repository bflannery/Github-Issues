import React, {useCallback, useState} from 'react';
import update from 'immutability-helper'

import Issue from "./Issue";

const IssuesList = ({ issues }) => {

    const issuesArr = Object.values(issues) || []

    const [issuesList, setIssueList] = useState(issuesArr)

    const moveIssue = useCallback(
    (dragIndex, hoverIndex) => {

        const dragCard = issuesList[dragIndex]

        const updatedIssues = update(issuesList, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        })

        const updatedIssuesByOrdinal = updatedIssues.map((issue, i) => ({
            ...issue,
            ordinal: i
        }))

        setIssueList(updatedIssuesByOrdinal)
    },
    [issuesList],
    )

    console.log({ issuesList })

    return (
        <div className="issues__list-container">
            <ul className="issues__list">
                {issuesList.map((issue, index) => (
                    <Issue
                        key={issue.id}
                        issue={issue}
                        moveIssue={moveIssue}
                        index={index}
                    />
                ))}
            </ul>
        </div>
    )
}

export default IssuesList
