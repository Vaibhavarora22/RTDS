import React, { useState } from 'react';
import axios from 'axios';

function ChatBox() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askAssistant = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ask', { question: query });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-xl max-w-lg bg-white shadow">
      <h2 className="text-xl font-bold mb-2">GPU Assistant Chat</h2>
      <textarea
        rows="3"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask about A100 vs L40s, cost optimizations..."
        className="w-full border rounded p-2 mb-2"
      />
      <button
        onClick={askAssistant}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Thinking...' : 'Ask'}
      </button>
      <div className="mt-4 text-gray-800 whitespace-pre-line">{answer}</div>
    </div>
  );
}

export default ChatBox;
