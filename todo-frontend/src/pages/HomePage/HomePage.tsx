import { useState, useEffect } from 'react'
import { getAllToDoListPosts } from '../../services/to-do-list-services';
import ToDoList from '../../containers/ToDoList/ToDoList';
import { Flip, toast } from 'react-toastify';

export interface ToDoProps {
  id: number;
  title: string;
  isComplete: boolean;
  createdAt: string;
}

const Homepage = () => {

  const [todoData, setTodoData] = useState<ToDoProps[]>([]);

  const notify = (error: Error) => {
    toast.error(`Error retrieving To Do List records: ${error.message}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Flip,
    });    
  }

  useEffect(() => {
    getAllToDoListPosts()
      .then((data) => setTodoData(data))
      .catch((e) => {
        // console.warn(e.message)
        notify(e)
      });
  }, []);

  return (
    <div>
      <ToDoList todoData={todoData} setTodoData={setTodoData} />   
    </div>
  )
}

export default Homepage