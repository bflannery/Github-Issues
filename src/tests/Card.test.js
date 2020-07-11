import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Card from "../components/Card";

describe('Repo Component', () => {
    let props = {}
    beforeEach(() => {
        props = {
            repo: {
                id: 1,
                name: 'Repo 1'
            }
        }

    })
    it('should render stuff', () => {
        const wrapper = shallow(<Card  props={props}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
