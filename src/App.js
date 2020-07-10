import React from 'react';
import {useSelector} from "react-redux";
import ReposList from "./components/ReposList";
import IssuesList from "./components/IssuesList";
import Card from "./components/Card";

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
    const issuesArr = Object.values(issues.issues || {})

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
                            <IssuesList issues={issuesArr} />
                        </Card>
                    )}
                    {issues.apiStatus.isLoading && <h4> Loading...</h4>}
                </div>
            </div>
        </div>
    )
}

export default App;
