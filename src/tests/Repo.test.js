import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Repo from "../components/Repo";
import configureStore from "../configureStore";
import {initialState} from "./mockState";
import {Provider} from "react-redux";

describe('Repo Component', () => {
    let props = {}
    let wrapper = {}
    beforeEach(() => {
        const mockStore = configureStore(initialState)
        props = {
            repo: {
                id: 1,
                name: 'Repo 1'
            }
        }
        wrapper = shallow(<Provider store={mockStore}><Repo props={props} /></Provider>)

    })
    it('should render Repo Component', () => {
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
