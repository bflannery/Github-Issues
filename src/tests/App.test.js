import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux'
import toJson from 'enzyme-to-json';
import App from '../App';
import configureStore from "../configureStore";

const REPO_1 =  {
    id: 0,
    name: 'Repo 1'
}

const REPO_2 =  {
    id: 2,
    name: 'Repo 2'
}

const ISSUE_1 =  {
    id: 0,
    created_at:"2020-07-10T00:21:39Z",
    updated_at:"2020-07-10T00:21:39Z",
    title: 'First Issue'
}

const ISSUE_2 =  {
    id: 1,
    created_at:"2020-06-10T00:21:39Z",
    updated_at:"2020-06-10T00:21:39Z",
    title: 'Second Issue'
}

const DEFAULT_API_STATUS = {
    hasLoaded: true,
    isLoading: false,
    error: null
}

const initialState = {
    issues: {
        issues: {
            0: ISSUE_1,
            1: ISSUE_2,
        },
        apiStatus: DEFAULT_API_STATUS

    },
    repos: {
        repos: {
            0: REPO_1,
            1: REPO_2
        },
        selectedRepo: REPO_1,
        apiStatus: DEFAULT_API_STATUS
    }
}

describe('App', () => {
    const mockStore = configureStore(initialState)
    const wrapper = shallow(<Provider store={mockStore}><App /></Provider>)

    it('renders without crashing', () => {
        expect(toJson(wrapper)).toMatchSnapshot()
    });

})

