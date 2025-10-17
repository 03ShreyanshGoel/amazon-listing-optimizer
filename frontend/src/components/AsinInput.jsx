import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const AsinInput = ({ onSubmit, loading }) => {
  const [asin, setAsin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate ASIN format
    const asinRegex = /^[A-Z0-9]{10}$/;
    if (!asinRegex.test(asin.toUpperCase())) {
      setError('Invalid ASIN format. Must be 10 alphanumeric characters.');
      return;
    }

    setError('');
    onSubmit(asin.toUpperCase());
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="asin" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Amazon ASIN
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="asin"
              value={asin}
              onChange={(e) => setAsin(e.target.value.toUpperCase())}
              placeholder="e.g., B08N5WRWNW"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={10}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              <FiSearch />
              Optimize
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default AsinInput;