import React, { useState, useEffect } from 'react';
import { fetchTransactions } from './Api';

const TransactionsTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const loadTransactions = () => {
    fetchTransactions(page, 10, searchQuery).then(response => {
      setTransactions(response.data.transactions);
    });
  };

  useEffect(() => {
    loadTransactions();
  }, [page, searchQuery, selectedMonth]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);  // Reset to the first page on new search
  };

  return (
    <div className='w-[70%] h-[70%]  '>
      <input
        type="text"
        placeholder="Search transaction"
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 bg-yellow-100"
      />
      <table className="min-w-full bg-yellow-100 rounded-sm">
        <thead>
          <tr className='p-3 '>
            <th className='p-3 '>ID</th>
            <th className='p-3'>Title</th>
            <th className='p-3'>Description</th>
            <th className='p-3'>Price</th>
            <th className='p-3'>Category</th>
            <th className='p-3'>Sold</th>
            <th className='p-3'>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
              <td><img src={transaction.image} alt={transaction.title} className="w-16 h-16"/></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>Previous</button>
        <button onClick={() => setPage(prev => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TransactionsTable;
