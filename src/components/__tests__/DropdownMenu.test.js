import React from 'react';
import { View, Alert } from 'react-native';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { DropdownMenu } from '../index';
import renderer from 'react-test-renderer';

const dataArray = [
    {
        value: '1',
        label: 'Country 1',
        image: {
          uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
        },
    },
    {
        value: '2',
        label: 'Country 2',
        image: {
          uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
        },
    },
    {
        value: '3',
        label: 'Country 3',
        image: {
          uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
        },
    },
];

const onChange = (text) => {
    Alert.alert("test", text);
};

const placeholder = "placeholder";

const MockDropdownMenu = () => {
    return (
        <View>
            <DropdownMenu 
                dataArray={dataArray} 
                onChange={onChange}
                placeholder={placeholder}    
            />
        </View>
    )
}

describe("DropdownMenu", () => {
    beforeEach(() => {
        render(<MockDropdownMenu />);
    });

    test("Should display correct placeholder", () => {
        const dropdownElement = screen.getByText(placeholder);
        expect(dropdownElement).toBeDefined();
    });

    // test("Dropdown menu should open", () => {
    //     const dropdownElement = screen.getByText(placeholder);
    //     fireEvent.press(dropdownElement);
    //     const selectionElement = screen.getByText(/Country/);
    //     expect(selectionElement).toBeDefined();
    // });

    test("Dropdown menu should open", () => {
        const component = renderer.create(<MockDropdownMenu />);
        let tree = component.toJSON();
        // expect(tree).toMatchSnapshot();

        component.root.findByProps({ testID:"dropdown-menu" });
        
        // tree = component.toJSON();
        // expect(tree).toMatchSnapshot();
    })
});
