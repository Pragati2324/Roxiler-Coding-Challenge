import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchPriceRanges } from './Api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TransactionsChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetchPriceRanges(selectedMonth).then(response => {
      const data = response.data;
      const labels = data.map(item => item.range);
      const counts = data.map(item => item.count);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Number of Items',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      });
    });
  }, [selectedMonth]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: `Price Range Distribution for ${selectedMonth}`
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price Range'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Items'
        }
      }
    }
  };

  return (
    <div className="my-8 p-4 w-[50%]  items-center bg-[#e3edf1] rounded shadow">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TransactionsChart;
