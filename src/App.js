import React, {useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import { fetchUserReposAction } from "./actions/repos";
import ReposList from "./components/ReposList";
import IssuesList from "./components/IssuesList";

const App = () => {

  // Redux dispatch
  const dispatch = useDispatch()

  // Redux state selectors
  const reposState = useSelector(state => state.repos)
  const issuesState = useSelector(state => state.issues)

  // Default component state
  const initialState = ''

  // Component State
  const [ apiKey, setApiKey ] = useState(initialState)

  // Dispatch fetch user repos action from redux
  const handleGetUserRepos = () => {
    if (apiKey.length !== 0) {
      dispatch(fetchUserReposAction(apiKey))
    }
  }

  // Update component state with new input value
  const handleOnChange = (e) => setApiKey(e.currentTarget.value)

  return (
    <div>
      <div>
        <input onChange={(e) => handleOnChange(e)} />
        <button onClick={handleGetUserRepos}>Get user repos.</button>
      </div>
      {reposState.apiStatus.isLoading
          ? <h4> Loading...</h4>
          : <ReposList />
      }
      {issuesState.apiStatus.isLoading
          ? <h4> Loading...</h4>
          : <IssuesList />
      }
    </div>
  )
}

export default App;
