import React from 'react';
import TaskProvider from './context/taskContext';
import DndProviderWrapper from './context/DndProviderWrapper';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

export default function App() {
  return (
    <TaskProvider>
      <DndProviderWrapper>
        <div className="app">
          <Header />
          <main>
            <TaskForm />
            <TaskList />
          </main>
          <footer>
            <p>&copy; {new Date().getFullYear()} Task Manager</p>
          </footer>
        </div>
      </DndProviderWrapper>
    </TaskProvider>
  );
}
