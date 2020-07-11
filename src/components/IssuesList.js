import React, {memo, useCallback, useEffect, useState} from 'react';
import update from 'immutability-helper'

import Issue from "./Issue";
import {useDispatch, useSelector} from "react-redux";
import {setRepoIssues } from "../actions/issues";
import {saveState} from "../sessionStorage";
import {normalize} from "normalizr";
import {issue} from "../reducers/issues";


const saveListState = (state, issuesList) => {
    const normalizedIssues = normalize(issuesList,  [issue])
    const newState = {
        ...state,
        issues: {
            ...state.issues,
            issues: {
                ...state.issues.issues,
                ...normalizedIssues.entities.issues
            },
            selectedRepoIssues: {
                ...state.issues.selectedRepoIssues,
                ...normalizedIssues.entities.issues
            }
        }
    }
    saveState(newState)
}

const IssuesList = memo(({ selectedRepo, issues }) => {
    const dispatch = useDispatch()

    const state = useSelector(state => state)

    const [issuesList, setIssueList] = useState(issues)

    useEffect(() => {
        if (issuesList.length > 0) {
            dispatch(setRepoIssues(issuesList))
            saveListState(state, issuesList)
        }
        return () => saveState(state)
    }, [issuesList])

    const moveIssue = useCallback(
    (dragIndex, hoverIndex) => {
        const dragIssue = issuesList[dragIndex]

        const updatedIssues = update(issuesList, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragIssue],
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

    return (
        <div className="issues-list-container">
            <ul className="issues-list">
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
})

export default IssuesList
