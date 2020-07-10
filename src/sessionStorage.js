// sessionStorage.js
// helper methods to deal with persisting and loading session information for
// app.  as opposed to localStorage, sessionStorage is cleared locally when the
// browser tab/window closes.

const STATE_KEY = 'state'

export const loadState = () => {
  try {
    const { sessionStorage } = window
    const serializedState = sessionStorage.getItem(STATE_KEY)
    if (typeof serializedState !== 'string') {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    // if any errors, just return undefined so that we don't supply initial
    // redux state with any persisted data (will use default state defined by
    // the reducer functions' default values)
    return undefined
  }
}

// persists session data to local sessionStorage.  this is expected to be used
// in order to initialize the app with persisted session information, so it
// should be passed the top-level `state` of the redux store.  this function
// will only persist necessary slices of state that we would like to save into
// the browser's sessionStorage.
export const saveState = (state) => {
  try {
    const { sessionStorage } = window
    const serializedState = JSON.stringify(state)
    sessionStorage.setItem(STATE_KEY, serializedState)
  } catch (err) {
    return new Error(err)
  }
}

export const clearState = () => {
  try {
    // only remove values from sessionStorage that we manage with our helper
    // other npm libs may use sessionStorage as well (like for persisting
    // router history for dev tools integration).
    const { sessionStorage } = window
    sessionStorage.removeItem(STATE_KEY)
  } catch (err) {
    return new Error(err)
  }
}
