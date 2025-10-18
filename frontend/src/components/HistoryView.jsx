import React, { useState, useEffect } from 'react';
import { getAllHistory } from '../services/api';
import { FiClock, FiPackage } from 'react-icons/fi';

const HistoryView = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const response = await getAllHistory();
      console.log("history in frontend",response);
      setHistory(response.data);
    } catch (err) {
      setError('Failed to load history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading history...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <FiPackage className="mx-auto text-6xl mb-4 opacity-50" />
        <p>No optimization history yet. Start by optimizing a product!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Optimization History</h2>
      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  ASIN: {item.asin}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {item.optimized_title}
                </p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FiClock className="mr-1" />
                {new Date(item.created_at).toLocaleString()}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;