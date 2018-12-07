import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from "enzyme";
import { App } from './App';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<App/>, div);

    ReactDOM.unmountComponentAtNode(div);
});

it('route between components', () => {
    const wrapper = mount(<App/>);

    expect(wrapper.find('Home')).toHaveLength(1);
    expect(wrapper.find('Featured')).toHaveLength(0);

    expect(wrapper.find('NavLink')).toHaveLength(3);
    wrapper.find('NavLink').at(1).simulate('click', { button: 0 });

    expect(wrapper.find('Home')).toHaveLength(0);
    expect(wrapper.find('Featured')).toHaveLength(1);
});
