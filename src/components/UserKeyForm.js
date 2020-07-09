import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUserReposAction} from "../actions/repos";


const UserKeyForm = ({ onChange, onSubmit }) => {
    // Redux dispatch
    const dispatch = useDispatch()

    // Redux state selectors
    const reduxState = useSelector(state => state)
    const { user } = reduxState

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
        <div className="user-key-form__page-container">
           <form className="user-key-form" onSubmit={(e) => handleGetUserRepos(e)}>
                <h4 className="user-key-form__title"> Find your repos!</h4>
                <input
                    placeholder="Enter GitHub ApiKey"
                    className="user-key-form__input-field"
                    onChange={e => handleOnChange(e)}
                />
                <button
                    className="user-key-form__submit-button"
                    onClick={(e) => handleGetUserRepos(e)}
                >
                    Submit
                </button>
            </form>
        </div>
)
}

export default UserKeyForm;
