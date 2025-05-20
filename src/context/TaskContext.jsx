import React, { createContext, useState, useEffect, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Create context
export const TaskContext = createContext();

export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  // Add a new task - useCallback for optimization
  const addTask = useCallback((text) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, [setTasks]);

  // Delete a task by ID - useCallback for optimization
  const deleteTask = useCallback((id) => {
    setTasks(prevTasks => prevTasks.filter((task) => task.id !== id));
  }, [setTasks]);

  // Toggle task completion status - useCallback for optimization
  const toggleComplete = useCallback((id) => {
    setTasks(prevTasks => 
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const reorderTasks = useCallback((reorderedTasks) => {
    setTasks(reorderedTasks);
  }, [setTasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleComplete,
        reorderTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
