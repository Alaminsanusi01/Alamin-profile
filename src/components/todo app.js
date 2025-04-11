import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy, getDocs } from 'firebase/firestore';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (task.trim() === '') return;

    await addDoc(collection(db, 'todos'), {
      text: task,
      createdAt: new Date()
    });

    setTask('');
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  const deleteAllTodos = async () => {
    const querySnapshot = await getDocs(collection(db, 'todos'));
    const deletePromises = querySnapshot.docs.map((docItem) =>
      deleteDoc(doc(db, 'todos', docItem.id))
    );
    await Promise.all(deletePromises);
  };

  useEffect(() => {
    const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todoList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(todoList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🔥 Firebase Todo App</h2>
        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <input 
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Add
          </button>
          <button 
            type="button"
            onClick={deleteAllTodos}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Delete All
          </button>
        </form>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li 
              key={todo.id}
              className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-md shadow-sm"
            >
              <span>{todo.text}</span>
              <button 
                onClick={() => deleteTodo(todo.id)} 
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
