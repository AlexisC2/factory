import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  test('renders input element', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('applies default type text', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
  });

  test('applies specified type', () => {
    render(<Input type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  test('displays placeholder', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  test('handles value prop', () => {
    render(<Input value="test value" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test value');
  });

  test('calls onChange when input changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-disabled', 'true');
  });

  test('shows loading spinner when loading is true', () => {
    render(<Input loading />);
    const spinner = screen.getByRole('textbox').parentElement?.querySelector('svg');
    expect(spinner).toBeInTheDocument();
  });

  test('displays error message', () => {
    render(<Input error="This is an error" id="test-input" />);
    const errorMessage = screen.getByText('This is an error');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute('role', 'alert');
  });

  test('sets aria-describedby when error is present', () => {
    render(<Input error="Error" id="test-input" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
  });

  test('sets aria-invalid to true when error is present', () => {
    render(<Input error="Error" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('applies custom className', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  test('sets aria-label correctly', () => {
    render(<Input ariaLabel="Test input" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-label', 'Test input');
  });

  test('sets id correctly', () => {
    render(<Input id="test-id" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'test-id');
  });

  test('sets required attribute', () => {
    render(<Input required />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('required');
  });

  test('sets autoComplete attribute', () => {
    render(<Input autoComplete="username" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('autocomplete', 'username');
  });
});