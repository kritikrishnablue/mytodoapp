'use client';

import { useEffect, useState } from 'react';
import { getTodos, addTodo } from '@/lib/api';
import { Todo } from '@/types/todo';
import TodoSidebar from './TodoSidebar';
import TodoEditor from './TodoEditor';

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (text: string) => {
    try {
      await addTodo(text);
      await fetchTodos();
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/3 border-r bg-[rgb(244,244,244)] p-20 overflow-y-auto border ">
        <TodoSidebar todos={todos} />
      </div>

      {/* Editor */}
      <div className="flex-1 p-6">
        <TodoEditor onAddTodo={handleAddTodo} />
      </div>
    </div>
  );
}
