import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [priority, setPriority] = useState('Low');

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        const newTaskObj = {
            id: Date.now(),
            task: newTask,
            priority,
            completed: false,
        };
        setTasks([...tasks, newTaskObj]);
        setNewTask('');
        setPriority('Low');
    };

    const toggleComplete = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div>
            <Header />
            <form onSubmit={addTask}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter task"
                />
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button type="submit">Submit</button>
            </form>

            <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
            <Footer />
        </div>
    );
};

export default App;
