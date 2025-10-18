// import React from 'react';

// const LoadingSpinner = ({ message = 'Processing...' }) => {
//   return (
//     <div className="flex flex-col items-center justify-center p-8">
//       <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-700"></div>
//       <p className="mt-4 text-gray-600 font-medium">{message}</p>
//     </div>
//   );
// };

// export default LoadingSpinner;
import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = 'Processing...' }) => {
  const variants = {
    initial: { scaleY: 0.5, opacity: 0 },
    animate: {
      scaleY: 1,
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: 'mirror',
        duration: 1,
        ease: 'circIn',
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center p-20">
      {/* Bar Loader Animation */}
      <motion.div
        transition={{ staggerChildren: 0.25 }}
        initial="initial"
        animate="animate"
        className="flex gap-1"
      >
        <motion.div variants={variants} className="h-12 w-2 bg-blue-700 rounded" />
        <motion.div variants={variants} className="h-12 w-2 bg-blue-700 rounded" />
        <motion.div variants={variants} className="h-12 w-2 bg-blue-700 rounded" />
        <motion.div variants={variants} className="h-12 w-2 bg-blue-700 rounded" />
        <motion.div variants={variants} className="h-12 w-2 bg-blue-700 rounded" />
      </motion.div>

      {/* Message Text */}
      <p className="mt-4 text-gray-600 font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
