import React from 'react';
import {useSelector} from "react-redux";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { createSelector } from 'reselect'
import moment from 'moment'

import ReposList from "./components/ReposList";
import IssuesList from "./components/IssuesList";
import Card from "./components/Card";


const getIssuesByDateFormat = createSelector(
    state => state.issues.selectedRepoIssues,
    state => state.repos.selectedRepo,
    (repoIssues = {}, selectedRepo = null) => {
        if (repoIssues === {} || Object.keys(repoIssues).length === 0) return []
        const repoIssuesArr = Object.values(repoIssues)
        return repoIssuesArr.map(repoIssue => {
            let formattedUpdatedAtText = ''
            const currentDateTime = moment()
            const lastUpdate = moment(repoIssue.updated_at)
            const timeDiffHours = currentDateTime.diff(lastUpdate, 'hours')
            formattedUpdatedAtText = `${timeDiffHours} ${timeDiffHours > 1 ? 'hours' : 'hour'} ago`

            if (timeDiffHours >= 24) {
                const timeDiffDays = currentDateTime.diff(lastUpdate, 'days')
                formattedUpdatedAtText = `${timeDiffDays} ${timeDiffDays > 1 ? 'days' : 'day'} ago`
            }
            return ({
            ...repoIssue,
            repoId: selectedRepo.id,
            createdAt: moment(repoIssue.created_at).format('MM/DD/YY'),
            updatedAt: formattedUpdatedAtText
            })
        })
    }
)

const getFormattedIssues = createSelector(
    getIssuesByDateFormat,
    repoIssues => {
        if (repoIssues.length === 0) return []
        return repoIssues.map((repoIssue, i) => (
           (repoIssue.hasOwnProperty('ordinal'))
               ? repoIssue
            : ({
                ...repoIssue,
                ordinal: i
            })
        ))
    }
)

const App = () => {
    // Redux state selectors
    const reduxState = useSelector(state => state)
    const { repos, issues } = reduxState

    // Handle api key change
    const handleOnChange = e => {
      console.log({ e })
    }

    // Submit new api key
    const handleGetUserRepos = e => {
        console.log({ e })
    }

    // Format repos and issues object to an array
    const reposArr = Object.values(repos.repos || {})
    const issuesArr = useSelector(getFormattedIssues)

    // Check page state is ready to render
    const pageIssuesReady = issuesArr.length > 0  && !issues.apiStatus.isLoading && issues.apiStatus.hasLoaded
    const pageReposReady = reposArr.length > 0  && !repos.apiStatus.isLoading && repos.apiStatus.hasLoaded

    return (
        <div className="app-page">
            <div className="app-page-toolbar">
                <div className="toolbar-info">
                    <h4 className="toolbar-title"> Github Issues</h4>
                </div>
                <div className="toolbar-search">
                    <span className="toolbar-search-text"> Find user repos: </span>
                    <input
                        placeholder="Enter GitHub ApiKey"
                        className="toolbar-search-input"
                        onChange={e => handleOnChange(e)}
                    />
                    <button
                        className="toolbar-search-submit"
                        onClick={(e) => handleGetUserRepos(e)}
                    >
                        Submit
                    </button>
                </div>
            </div>
            <div className="app-page-content">
                <div className="app-page-left-column-container">
                    {pageReposReady && (
                        <Card classPrefix="app-page-left-column" title="Repos">
                            <ReposList repos={reposArr} />
                        </Card>
                    )}
                    {issues.apiStatus.isLoading && <h4> Loading...</h4>}
                </div>
                <div className="app-page-right-column-container">
                    {pageIssuesReady && (
                        <Card classPrefix="app-page-right-column" title="Issues">
                            <DndProvider backend={HTML5Backend}>
                                <IssuesList
                                 selectedRepo={repos.selectedRepo}
                                 issues={issuesArr}
                                />
                            </DndProvider>
                        </Card>
                    )}
                    {issues.apiStatus.isLoading && <h4> Loading...</h4>}
                </div>
            </div>
        </div>
    )
}

export default App;
