import React from 'react';
import './App.css';
import {useSelector} from "react-redux";
import ReposList from "./components/ReposList";
import IssuesList from "./components/IssuesList";

const App = () => {
  // Redux state selectors
  const reduxState = useSelector(state => state)
  const { repos, issues } = reduxState

  return (
    <div className="app-container">
      {repos.repos.length > 0  && !repos.apiStatus.isLoading && repos.apiStatus.hasLoaded
          ? <h4> Loading...</h4>
          : <ReposList />
      }
      {issues.issues.length > 0  && !issues.apiStatus.isLoading && issues.apiStatus.hasLoaded
          ? <h4> Loading...</h4>
          : <IssuesList />
      }
    </div>
  )
}

export default App;
