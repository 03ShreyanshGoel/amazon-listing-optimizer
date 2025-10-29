// import React, { useState, useEffect } from 'react';
// import { getAllHistory } from '../services/api';
// import { FiClock, FiPackage } from 'react-icons/fi';

// const HistoryView = () => {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     loadHistory();
//   }, []);

//   const loadHistory = async () => {
//     try {
//       setLoading(true);
//       const response = await getAllHistory();
//       console.log("history in frontend",response);
//       setHistory(response.data);
//     } catch (err) {
//       setError('Failed to load history');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-8">Loading history...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-8 text-red-600">{error}</div>;
//   }

//   if (history.length === 0) {
//     return (
//       <div className="text-center py-12 text-gray-500">
//         <FiPackage className="mx-auto text-6xl mb-4 opacity-50" />
//         <p>No optimization history yet. Start by optimizing a product!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-7xl mx-auto mt-8">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Optimization History</h2>
//       <div className="space-y-4">
//         {history.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
//           >
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   ASIN: {item.asin}
//                 </h3>
//                 <p className="text-sm text-gray-600 mt-1">
//                   {item.optimized_title}
//                 </p>
//               </div>
//               <div className="flex items-center text-sm text-gray-500">
//                 <FiClock className="mr-1" />
//                 {new Date(item.created_at).toLocaleString()}
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               {item.keywords.map((keyword, index) => (
//                 <span
//                   key={index}
//                   className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
//                 >
//                   {keyword}
//                 </span>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HistoryView;

import React, { useState, useEffect } from 'react';
import { getAllHistory } from '../services/api';
import { FiClock, FiPackage, FiChevronRight } from 'react-icons/fi';

const HistoryView = ({ onViewDetail }) => {
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
      console.log("history in frontend", response);
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Optimization History ({history.length})
      </h2>
      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onViewDetail(item)}
            className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    ASIN: {item.asin}
                  </h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    ID: {item.id}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.optimized_title}
                </p>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiClock className="mr-1" />
                    {new Date(item.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(item.created_at).toLocaleTimeString()}
                  </div>
                </div>
                <FiChevronRight className="text-gray-400 text-xl" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.keywords.slice(0, 3).map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {keyword}
                </span>
              ))}
              {item.keywords.length > 3 && (
                <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
                  +{item.keywords.length - 3} more
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;