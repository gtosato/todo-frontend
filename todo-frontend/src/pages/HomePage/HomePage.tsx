import { useState, useEffect } from 'react'
import { getAllToDoListPosts } from '../../services/to-do-list-services';
import ToDoList from '../../containers/ToDoList/ToDoList';

export interface ToDoProps {
  id: number;
  title: string;
  isComplete: boolean;
  createdAt: string;
}

const Homepage = () => {

  const [todoData, setTodoData] = useState<ToDoProps[]>([]);

  useEffect(() => {
    getAllToDoListPosts()
      .then((data) => setTodoData(data))
      .catch((e) => console.warn(e.message));
  }, []);

  return (
    <div>
        <ToDoList todoData={todoData} setTodoData={setTodoData} />          
    </div>
  )
}

export default Homepage