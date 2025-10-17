import React, { useState } from 'react';
import AsinInput from './components/AsinInput';
import ComparisonView from './components/ComparisonView';
import Com
import HistoryView from './components/HistoryView';
import LoadingSpinner from './components/LoadingSpinner';
import { optimizeProduct } from './services/api';
import { FiRefreshCw } from 'react-icons/fi';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleOptimize = async (asin) => {
    try {
      setLoading(true);
      setError('');
      setResult(null);
      
      const response = await optimizeProduct(asin);
      setResult(response.data);
      
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to optimize product. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Amazon Listing Optimizer
          </h1>
          <p className="text-gray-600">
            AI-powered optimization for your Amazon product listings
          </p>
        </header>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => {
              setShowHistory(false);
              handleReset();
            }}
            className={`px-6 py-2 rounded-lg transition-colors ${
              !showHistory
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Optimize Product
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className={`px-6 py-2 rounded-lg transition-colors ${
              showHistory
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            View History
          </button>
        </div>

        {/* Main Content */}
        {!showHistory ? (
          <>
            {/* Input Section */}
            {!result && (
              <AsinInput onSubmit={handleOptimize} loading={loading} />
            )}

            {/* Loading State */}
            {loading && (
              <LoadingSpinner message="Fetching and optimizing product listing..." />
            )}

            {/* Error Message */}
            {error && (
              <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Results */}
            {result && (
              <>
                <ComparisonView data={result} />
                <div className="text-center mt-8">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2 mx-auto"
                  >
                    <FiRefreshCw />
                    Optimize Another Product
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <HistoryView />
        )}
      </div>
    </div>
  );
}

export default App;