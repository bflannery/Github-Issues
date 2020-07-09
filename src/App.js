import React, {useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import { fetchUserReposAction } from "./actions/repos";
import ReposList from "./components/ReposList";
import IssuesList from "./components/IssuesList";
import UserKeyForm from "./components/UserKeyForm";

const App = () => {

  // Redux dispatch
  const dispatch = useDispatch()

  // Redux state selectors
  const reduxState = useSelector(state => state)
  const { repos, issues, user } = reduxState

  // Default component state
  const initialState = {
    apiKey: user.userApiKey,
    submitted: false,
  }

  // Component State
  const [ localState, setLocalState ] = useState(initialState)

  // Dispatch fetch user repos action from redux
  const handleGetUserRepos = (e) => {
    e.preventDefault()
    if (localState.apiKey.length !== 0) {
      dispatch(fetchUserReposAction(localState.apiKey))
      setLocalState({ ...localState, submitted: true })
    }
  }

  // Update component state with new input value
  const handleOnChange = (e) => setLocalState({ ...localState, apiKey: e.currentTarget.value })

  return (
    <div className="app-container">
      <UserKeyForm
          onChange={handleOnChange}
          onSubmit={handleGetUserRepos}
      />
      {repos.apiStatus.isLoading
          ? <h4> Loading...</h4>
          : <ReposList />
      }
      {issues.apiStatus.isLoading
          ? <h4> Loading...</h4>
          : <IssuesList />
      }
    </div>
  )
}

export default App;
