import React from 'react';

const ComparisonView = ({ data }) => {
  if (!data) return null;

  return (
    <div className="w-full max-w-7xl mx-auto mt-8 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Optimization Results for ASIN: {data.asin}
        </h2>

        {/* Title Comparison */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Title</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-xs font-semibold text-gray-500 mb-2">ORIGINAL</p>
              <p className="text-sm text-gray-800">{data.original.title}</p>
            </div>
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <p className="text-xs font-semibold text-green-600 mb-2">OPTIMIZED</p>
              <p className="text-sm text-gray-800">{data.optimized.title}</p>
            </div>
          </div>
        </div>

        {/* Bullet Points Comparison */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Bullet Points</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-xs font-semibold text-gray-500 mb-3">ORIGINAL</p>
              <ul className="space-y-2">
                {data.original.bullets.map((bullet, index) => (
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
                {data.optimized.bullets.map((bullet, index) => (
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
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Description</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-xs font-semibold text-gray-500 mb-2">ORIGINAL</p>
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {data.original.description || 'No description available'}
              </p>
            </div>
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <p className="text-xs font-semibold text-green-600 mb-2">OPTIMIZED</p>
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {data.optimized.description}
              </p>
            </div>
          </div>
        </div>

        {/* Keywords */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Suggested Keywords</h3>
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <div className="flex flex-wrap gap-2">
              {data.optimized.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;