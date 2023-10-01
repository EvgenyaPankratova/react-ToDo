import {render, screen} from '@testing-library/react';
import Main from './Main';

describe('Main component', () => {
    it('Main renders', () => {
        render(<Main/>);
        expect(screen.getByText('задачи')).toBeInTheDocument();
    });
});