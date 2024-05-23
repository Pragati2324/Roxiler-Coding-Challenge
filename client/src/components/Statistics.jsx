import React, { useState, useEffect } from 'react';
import { fetchStatistics } from './Api';

const Statistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalUnsoldItems: 0
  });

  useEffect(() => {
    fetchStatistics(selectedMonth).then(response => {
      const data = response.data;
      setStatistics({
        totalSaleAmount: data.totalSaleAmount,
        totalSoldItems: data.totalSoldItems,
        totalUnsoldItems: data.totalUnsoldItems
      });
    });
  }, [selectedMonth]);

  return (
    <div className="p-4 bg-yellow-100 rounded w-[20%]">
      <h2 className="text-lg font-bold">Statistics - {selectedMonth}</h2>
      <div>Total Sale Amount: {statistics.totalSaleAmount}</div>
      <div>Total Sold Items: {statistics.totalSoldItems}</div>
      <div>Total Unsold Items: {statistics.totalUnsoldItems}</div>
    </div>
  );
};

export default Statistics;
