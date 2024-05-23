const axios = require('axios');

async function testAPI() {
  try {
    // Initialize database
    const initResponse = await axios.get('http://localhost:5000/init');
    console.log('Init Response:', initResponse.data);

    // Transactions endpoint with search and pagination
    const transactionsResponse = await axios.get('http://localhost:5000/api/transactions', {
      params: { month: '05', search: 'product', page: 1, perPage: 10 }
    });
    console.log('Transactions Response:', transactionsResponse.data);

    // Statistics endpoint
    const statisticsResponse = await axios.get('http://localhost:5000/api/statistics', {
      params: { month: '05' }
    });
    console.log('Statistics Response:', statisticsResponse.data);

    // Bar chart endpoint
    const barChartResponse = await axios.get('http://localhost:5000/api/bar-chart', {
      params: { month: '05' }
    });
    console.log('Bar Chart Response:', barChartResponse.data);

    // Pie chart endpoint
    const pieChartResponse = await axios.get('http://localhost:5000/api/pie-chart', {
      params: { month: '05' }
    });
    console.log('Pie Chart Response:', pieChartResponse.data);

    // Combined endpoint
    const combinedResponse = await axios.get('http://localhost:5000/api/combined', {
      params: { month: '05' }
    });
    console.log('Combined Response:', combinedResponse.data);
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testAPI();
