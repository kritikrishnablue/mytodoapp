'use client';

import { useState } from 'react';
import { Todo } from '@/types/todo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faClock } from '@fortawesome/free-regular-svg-icons';

type Props = {
  todos: Todo[];
};

export default function TodoSidebar({ todos }: Props) {
  const [search, setSearch] = useState('');

  const toggleCompletion = async (id: string, currentState: boolean) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !currentState }),
    });
    window.location.reload();
  };

  const deleteTodo = async (id: string) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'DELETE',
    });
    window.location.reload();
  };

  const filtered = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full max-h-screen">
      <div className="flex items-center gap-2 mb-4">
        <button className="bg-black text-white rounded px-4 py-1 text-sm font-medium">
          TODO
        </button>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto border px-3 py-1 text-sm rounded text-black"
        />
      </div>

      <div className="overflow-y-auto flex-1 pr-1 space-y-2 scroll-smooth hide-scrollbar">
        {filtered.map((todo) => (
          <div
            key={todo._id}
            className="bg-white shadow-md p-3 rounded border hover:border-black cursor-pointer"
          >
            <div className="font-semibold text-black mb-2">{todo.text}</div>
            <div className="text-sm text-gray-600 mb-2">
              {todo.completed ? (
                <span className="text-green-600 font-medium flex items-center gap-1">
                  Completed
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faClock} />
                  Pending
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompletion(todo._id, todo.completed)}
                className="accent-black w-4 h-4"
                title="Mark as done"
              />
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-black hover:text-red-500"
                title="Delete"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
