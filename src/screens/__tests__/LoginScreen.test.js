import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { LoginScreen } from '../index';

describe("LoginScreen", () => {
    beforeEach(() => {
        render(<LoginScreen />);
    });

    test("Should display 2 textboxes for logging in", () => {
        const inputElements = screen.getAllByPlaceholderText(/Your /i);
        expect(inputElements.length).toBe(2);
    });

    test("Should indicate that user is logging in", () => {
        const paraElement = screen.getByText(/logging in/i);
        expect(paraElement).toBeDefined();
    });

    test("Should display button to Switch to Sign Up", () => {
        const buttonElement = screen.getByText(/Switch to Sign Up/i);
        expect(buttonElement).toBeDefined();
    });

    test("Should display 3 textboxes for signing up", () => {
        const switchElement = screen.getByText(/Switch to Sign Up/i)
        fireEvent.press(switchElement);
        const inputElements = screen.getAllByPlaceholderText(/Your /i);
        expect(inputElements.length).toBe(3);
    });

    test("Should indicate that user is signing up", () => {
        const switchElement = screen.getByText(/Switch to Sign Up/i)
        fireEvent.press(switchElement);
        const paraElement = screen.getByText(/signing up/i);
        expect(paraElement).toBeDefined();
    });

    test("Should display button to Switch to Log In", () => {
        const switchElement = screen.getByText(/Switch to Sign Up/i)
        fireEvent.press(switchElement);
        const buttonElement = screen.getByText(/Switch to Log In/i);
        expect(buttonElement).toBeDefined();
    });
});
