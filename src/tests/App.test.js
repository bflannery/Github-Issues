import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux'
import toJson from 'enzyme-to-json';
import App from '../App';
import configureStore from "../configureStore";
import {initialState} from "./mockState";

describe('App', () => {
    const mockStore = configureStore(initialState)
    const wrapper = shallow(<Provider store={mockStore}><App /></Provider>)

    it('renders without crashing', () => {
        expect(toJson(wrapper)).toMatchSnapshot()
    });

})

