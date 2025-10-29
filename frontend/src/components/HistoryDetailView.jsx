import React from 'react';
import { FiArrowLeft, FiClock, FiCalendar } from 'react-icons/fi';

const HistoryDetailView = ({ historyItem, onBack }) => {
  if (!historyItem) return null;

  // Format the history item to match ComparisonView data structure
  const formattedData = {
    asin: historyItem.asin,
    original: {
      title: historyItem.original_title,
      bullets: historyItem.original_bullets,
      description: historyItem.original_description
    },
    optimized: {
      title: historyItem.optimized_title,
      bullets: historyItem.optimized_bullets,
      description: historyItem.optimized_description,
      keywords: historyItem.keywords
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-8 space-y-6">
      {/* Back Button and Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <FiArrowLeft />
          Back to History
        </button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">
            Historical Optimization
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
            <div className="flex items-center gap-1">
              <FiCalendar />
              {new Date(historyItem.created_at).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <FiClock />
              {new Date(historyItem.created_at).toLocaleTimeString()}
            </div>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
              Record ID: {historyItem.id}
            </span>
          </div>
        </div>
      </div>

      {/* Comparison View */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 text-gray-800">
          Optimization Results for ASIN: {formattedData.asin}
        </h3>

        {/* Title Comparison */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">Title</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-xs font-semibold text-gray-500 mb-2">ORIGINAL</p>
              <p className="text-sm text-gray-800">{formattedData.original.title}</p>
            </div>
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <p className="text-xs font-semibold text-green-600 mb-2">OPTIMIZED</p>
              <p className="text-sm text-gray-800">{formattedData.optimized.title}</p>
            </div>
          </div>
        </div>

        {/* Bullet Points Comparison */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">Bullet Points</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-xs font-semibold text-gray-500 mb-3">ORIGINAL</p>
              <ul className="space-y-2">
                {formattedData.original.bullets.map((bullet, index) => (
                  <li key={index} className="text-sm text-gray-800 flex">
                    <span className="mr-2">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <p className="text-xs font-semibold text-green-600 mb-3">OPTIMIZED</p>
              <ul className="space-y-2">
                {formattedData.optimized.bullets.map((bullet, index) => (
                  <li key={index} className="text-sm text-gray-800 flex">
                    <span className="mr-2">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Description Comparison */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">Description</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-xs font-semibold text-gray-500 mb-2">ORIGINAL</p>
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {formattedData.original.description || 'No description available'}
              </p>
            </div>
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <p className="text-xs font-semibold text-green-600 mb-2">OPTIMIZED</p>
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {formattedData.optimized.description}
              </p>
            </div>
          </div>
        </div>

        {/* Keywords */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-700">Suggested Keywords</h4>
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <div className="flex flex-wrap gap-2">
              {formattedData.optimized.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-700 text-white text-sm rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back Button at Bottom */}
      <div className="text-center">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 mx-auto"
        >
          <FiArrowLeft />
          Back to History
        </button>
      </div>
    </div>
  );
};

export default HistoryDetailView;