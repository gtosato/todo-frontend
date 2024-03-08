export interface ToDoListData {
  id: number;
  title: string;
  isComplete: boolean;
  createdAt: string;
}

export const getAllToDoListPosts = async () : Promise<ToDoListData[]> => {
  const response = await fetch("http://localhost:8080/posts");

  if (!response.ok) {
    throw new Error("Failed to get posts");
  }

  const data = await response.json();

  return data;
};

export const deleteToDoListPost = async (taskId: number): Promise<void> => {
  const response = await fetch(`http://localhost:8080/posts/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete post with ID ${taskId}`);
  }
};

export const createToDoListPost = async (todoTaskValue: string): Promise<void> => {
  const response = await fetch(`http://localhost:8080/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title:  todoTaskValue,
      isComplete:false
    })  
});

  if (!response.ok) {
    throw new Error("Failed to create new To Do item");
  }
};

export const updateToDoListPost = async (taskId: number, updatedData: Partial<ToDoListData>): Promise<void> => {
  const response = await fetch(`http://localhost:8080/posts/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update post with ID ${taskId}`);
  }
};

