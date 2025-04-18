import { Todo } from '../types/todo';

const BASE_URL = 'http://localhost:5000/api/todos';

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

export async function addTodo(text: string): Promise<Todo> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error('Failed to add todo');
  return res.json();
}
