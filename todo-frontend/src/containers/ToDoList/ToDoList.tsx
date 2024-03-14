import { useEffect } from "react";
import { ToDoProps } from "../../pages/HomePage/HomePage"
import ToDoCard, { ToDoCardProps } from "../../components/ToDoCard/ToDoCard";
import { deleteToDoListPost, updateToDoListPost } from "../../services/to-do-list-services";
import styles from "./ToDoList.module.scss"
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

interface ToDoListProps {
  todoData: ToDoProps[];
  setTodoData: React.Dispatch<React.SetStateAction<ToDoProps[]>>;
}

const ToDoList: React.FC<ToDoListProps> = ({ todoData, setTodoData }) => {

  // console.log('todoData:', todoData);

  const navigate = useNavigate();

  const handleDelete = async (taskId: number) => {
    // console.log(`Deleting task with ID ${taskId}`);
    try {
      await deleteToDoListPost(taskId);
      // console.log(`Task with ID ${taskId} deleted successfully.`);

      setTodoData((prevData) => prevData.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }    
  };  
  
  const handleUpdate = async (id: number, updatedData: Partial<ToDoCardProps>) => {
    try {
      await updateToDoListPost(id, updatedData);
      // console.log(`Task with ID ${id} updated successfully.`);

      setTodoData(prevData => {
        const updatedList = prevData.map(todo =>
          todo.id === id ? { ...todo, ...updatedData } : todo
        );
        return updatedList;
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  useEffect(() => {
    setTodoData(todoData);
  }, [todoData, setTodoData]);  
  
  const createItem = () => {
    navigate("/create");
  }

  return (
    <main className={styles.main}>
      <Header />

      <button className={styles.button} onClick={createItem}>Create Item</button>
        {todoData.map((todo) => (
            <ToDoCard
                key={todo.id}
                id={todo.id}
                title={todo.title}
                isComplete={todo.isComplete}
                createdAt={todo.createdAt}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
            />
        ))}          
    </main>
  );
};
export default ToDoList