import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vitest } from 'vitest';
import ToDoCard from './ToDoCard';

describe('ToDoCard', () => {
  it('should have the checkbox checked when isComplete is true', () => {
    render(
      <ToDoCard
        id={1}
        title="Test Task"
        isComplete={true}
        createdAt="2024-03-08T10:30:00Z"
        onDelete={() => {}}
        onUpdate={() => {}}
      />
    );

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();
  });

  it('should have the checkbox unchecked when isComplete is false', () => {
    render(
      <ToDoCard
        id={1}
        title="Test Task"
        isComplete={false}
        createdAt="2024-03-08T10:30:00Z"
        onDelete={() => {}}
        onUpdate={() => {}}
      />
    );

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();
  });

  it('should show the pencil button when the checkbox is unchecked', async () => {

    const { getByTestId, queryByTestId } = render(
      <ToDoCard
        id={1}
        title="Test Task"
        isComplete={false}
        createdAt="2024-03-08T10:30:00Z"
        onDelete={() => {}}
        onUpdate={() => {}}
      />
    );

    const pencilButtonBefore = getByTestId('pencil-button');
    expect(pencilButtonBefore).toBeInTheDocument();

    const checkbox = getByTestId('checkbox') as HTMLInputElement;
    checkbox.checked = false;

    checkbox.dispatchEvent(new Event('change', { bubbles: true }));

    const pencilButtonAfter = queryByTestId('pencil-button');
    expect(pencilButtonAfter).toBeInTheDocument();
  });
    
 it('should hide the pencil button when the checkbox is checked', async () => {
  const { getByTestId, queryByTestId } = render(
    <ToDoCard
      id={1}
      title="Test Task"
      isComplete={true} 
      createdAt="2024-03-08T10:30:00Z"
      onDelete={() => {}}
      onUpdate={() => {}}
    />
  );

  const pencilButtonBefore = queryByTestId('pencil-button');
  expect(pencilButtonBefore).not.toBeInTheDocument();

  const checkbox = getByTestId('checkbox') as HTMLInputElement;
  checkbox.checked = false;

  checkbox.dispatchEvent(new Event('change', { bubbles: true }));

  const pencilButtonAfter = queryByTestId('pencil-button');
  expect(pencilButtonAfter).not.toBeInTheDocument();
 });
    
  it('should display the input box when the pencil button is clicked', async () => {
    const { getByTestId, queryByTestId } = render(
      <ToDoCard
        id={1}
        title="Test Task"
        isComplete={false}
        createdAt="2024-03-08T10:30:00Z"
        onDelete={() => {}}
        onUpdate={() => {}}
      />
    );

    expect(queryByTestId('title-input')).not.toBeInTheDocument();

    const pencilButton = getByTestId('pencil-button');
    fireEvent.click(pencilButton);

    expect(getByTestId('title-input')).toBeInTheDocument();
  });    

  it('should not display the text box once it loses focus', async () => {
    const { getByTestId, queryByTestId } = render(
      <ToDoCard
        id={1}
        title="Test Task"
        isComplete={false}
        createdAt="2024-03-08T10:30:00Z"
        onDelete={() => {}}
        onUpdate={() => {}}
      />
    );

    const pencilButton = getByTestId('pencil-button');
    fireEvent.click(pencilButton);

    expect(getByTestId('title-input')).toBeInTheDocument();

    const titleInput = getByTestId('title-input');
    fireEvent.blur(titleInput);

    expect(queryByTestId('title-input')).not.toBeInTheDocument();
  });

  it('should remove the component when the user clicks the delete button', async () => {
    const onDeleteMock = vitest.fn();

    const { getByTestId, queryByTestId } = render(
      <ToDoCard
        id={1}
        title="Test Task"
        isComplete={false}
        createdAt="2024-03-08T10:30:00Z"
        onDelete={onDeleteMock}
        onUpdate={() => {}}
      />
    );
      
    expect(queryByTestId('to-do-card')).toBeInTheDocument();

    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledWith(1);

    // expect(queryByTestId('to-do-card')).not.toBeInTheDocument();
  });    

});
