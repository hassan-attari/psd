import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CustomPagination } from './index';
describe('CustomPagination component', () => {
  it('renders total items, pagination, and per page select', () => {
    render(
      <CustomPagination
        totalItems={100}
        page={2}
        perPage={25}
        onPageChange={() => {
          /* no-op */
        }}
        onPerPageChange={() => {
          /* no-op */
        }}
      />
    );
    expect(screen.getByText(/Total Items: 100/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /go to page 2/i })
    ).toHaveAttribute('aria-current', 'true');
    expect(screen.getByDisplayValue('25')).toBeInTheDocument();
  });
});
