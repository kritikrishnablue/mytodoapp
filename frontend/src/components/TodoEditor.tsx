'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type Props = {
  onAddTodo: (text: string) => void;
};

export default function TodoEditor({ onAddTodo }: Props) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    await onAddTodo(text);
    setText('');
    setIsLoading(false);
  };

  return (
    <div className="border p-6 rounded bg-white shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black">New Additions</h2>
      </div>

      <textarea
        className="w-full h-40 p-2 border rounded resize-none mt-2 text-black"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your todo..."
      />

      <button
        onClick={handleAdd}
        disabled={isLoading}
        className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
      >
        {isLoading ? 'Adding...' : (
          <>
            <FontAwesomeIcon icon={faPlus} />
            Add Todo
          </>
        )}
      </button>
    </div>
  );
}
