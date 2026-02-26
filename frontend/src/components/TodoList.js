// frontend/src/components/TodoList.js
import React, { useState } from 'react';

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleEditClick = (todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);
  };

  const handleEditSave = (id) => {
    if (!editTitle.trim()) return;
    onEdit(id, { title: editTitle });
    setEditId(null);
    setEditTitle('');
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          {editId === todo._id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <button onClick={() => handleEditSave(todo._id)}>Simpan</button>
              <button onClick={() => setEditId(null)}>Batal</button>
            </>
          ) : (
            <>
              <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                onClick={() => onToggle(todo._id, { completed: !todo.completed })}
              >
                {todo.title}
              </span>
              <button onClick={() => handleEditClick(todo)}>Edit</button>
              <button onClick={() => onDelete(todo._id)}>Hapus</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;