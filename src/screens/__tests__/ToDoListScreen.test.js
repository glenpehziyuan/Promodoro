import { render, screen, fireEvent } from '@testing-library/react-native';
import { ToDoListScreen } from '../index';

describe("ToDoListScreen", () => {
    beforeEach(() => {
        render(<ToDoListScreen />);
        const inputElement = screen.getByPlaceholderText(/Write a task/i)
        const addButtonElement = screen.getByText("+");
        fireEvent.changeText(inputElement, "Make coffee");
        fireEvent.press(addButtonElement);
    });

    test("Should display tasks that are added", () => {
        const taskElement = screen.getByText(/Make coffee/i);
        expect(taskElement).toBeDefined();
    });

    test("Should be able to delete tasks", () => {
        const taskElement = screen.getByText(/Make coffee/i);
        fireEvent.press(taskElement);
        const deletedElement = screen.queryByText(/Make coffee/i);
        expect(deletedElement).toBeNull();
    });

});
