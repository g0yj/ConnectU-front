import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaTrashAlt } from 'react-icons/fa';

export default function TodoList() {
    const filters = ['all', 'active', 'completed'];
    const [todos, setTodos] = useState([
        { id: '1', text: '장보기', status: 'active' },
        { id: '2', text: '장보기1', status: 'active' },
        { id: '3', text: '장보기2', status: 'active' },
    ])

    const handleAdd = (todo) => {
        setTodos([...todos, todo]);
    }

    const handleUpdate = (updated) => {
        setTodos(todos.map((t) => t.id === updated.id ? updated : t));
    }

    const handleDelete = (deleted) => {
        setTodos(todos.filter((t) => t.id !== deleted.id));
    }
    const [filter, setFilter] = useState(filters[0]);
    const filteredTodos = todos.filter((todo) => {
        if (filter === 'all') { return true; }
        return todo.status === filter;
    }) 
    return (
        <div>
            <section>
                <button onClick={() => setFilter('all')}>전체</button>
                <button onClick={() => setFilter('completed')}>완료</button>
                <button onClick={() => setFilter('active')}>미완료</button>
                <ul>
                    {filteredTodos.map((item) => (
                        <Todo
                            key={item.id}
                            todo={item}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                        ))
                    }
                </ul>
                <AddTodo onAdd={handleAdd}/>
            </section>
        </div>
    );
}


export  function AddTodo({ onAdd }) {
    const [text, setText] = useState('');
    const handleChange = (e) => setText(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length === 0) { return; }
        onAdd({ id: uuidv4() , text, status: 'active' });
        setText('');
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Add Todo'
                value={text}
                onChange={handleChange}
            />
            <button>Add</button>
        </form>
    );
}

export function Todo({ todo, onUpdate, onDelete }) {
    const handleChange = (e) => {
        const status = e.target.checked ? 'completed' : 'active';
        onUpdate({ ...todo, status: status });
    }

    const handleDelete = () => {
        onDelete(todo)
    }

    return (
        <li>
            <input
                type='checkbox'
                id={todo.id}
                checked={todo.status === 'completed'}
                onChange={handleChange}
            />
            <label htmlFor={todo.id}>{todo.text}</label>
            <button onClick={handleDelete}>
                <FaTrashAlt />
            </button>
        </li>
    );
}


