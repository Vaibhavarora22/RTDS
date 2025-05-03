import React from 'react';

const RecommendationList = ({ data }) => {
  return (
    <div className="mt-4">
      {data.map((gpu, i) => (
        <div key={i} className="p-4 border rounded mb-2">
          <h2 className="font-semibold">{gpu.resource_name}</h2>
          <p>{gpu.gpu_description}</p>
          <p>Price/Month: ${gpu.price_per_month}</p>
          <p>Score: {gpu.score}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationList;
