import React from 'react';
import Picker from '../components/picker/Picker';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Optional: to get helpful DOM matchers

describe('Picker Component', () => {
    const mockItems = [
      { id: '1', display: 'Item 1' },
      { id: '2', display: 'Item 2' },
    ];
  
    test('renders the Picker with items', () => {
      render(<Picker items={mockItems} onClickItem={jest.fn()} />);
      
      // Check if the items are rendered correctly
      mockItems.forEach(item => {
        expect(screen.getByText(item.display)).toBeInTheDocument();
      });
    });
  
    test('calls onClickItem when a button is clicked', () => {
      const mockOnClickItem = jest.fn();
      render(<Picker items={mockItems} onClickItem={mockOnClickItem} />);
      
      // Simulate a click on the first item
      fireEvent.click(screen.getByText('Item 1'));
      
      // Ensure the mock function was called with the correct ID
      expect(mockOnClickItem).toHaveBeenCalledWith('1');
    });
  });