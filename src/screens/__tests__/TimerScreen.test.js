import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { TimerScreen } from '../index';

const mockRoute = {
    params: {
        work: 1,
        break: 2,
        background: 'https://www.vigcenter.com/public/all/images/default-image.jpg'
    }
};

describe("TimerScreen", () => {
    beforeEach(() => {
        render(
            <TimerScreen 
                route={mockRoute}
            />
        );
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("Should display background", () => {
        const imageElement = screen.getByTestId("background-image");
        expect(imageElement).toBeDefined();
    });

    test("Time should run down after Start", async () => {
        const startButtonElement = screen.getByText(/Start/i);
        fireEvent.press(startButtonElement);
        await waitFor(() => {
            const timeElement = screen.getByText(/00 : 59/);
            expect(timeElement).toBeDefined();
        });
    });

    test("Should display Break after work time ends", async () => {
        const startButtonElement = screen.getByText(/Start/i);
        fireEvent.press(startButtonElement);
        await waitFor(
            () => {
                const breakTextElement = screen.getByText(/Break/);
                expect(breakTextElement).toBeDefined();
            },
            options={
                timeout: 60000
            }
        );
    });

    test("Start break timer after work time ends", async () => {
        const startButtonElement = screen.getByText(/Start/i);
        fireEvent.press(startButtonElement);
        await waitFor(
            () => {
                const timeElement = screen.getByText(/02 :/);
                expect(timeElement).toBeDefined();
            },
            options={
                timeout: 60000,
                interval: 1000
            }
        );
    });
});
