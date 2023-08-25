import { useState, useEffect } from 'react';
import { Button,Pagination,Table} from 'react-bootstrap';


function StockTable({stockData, addItemToCart}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); 
  
  useEffect(() => {
    
    if (stockData) {
      setLoading(false); // Veri geldiğinde loading durumunu false yap
    }
    
  }, [stockData,currentPage]);


  if (loading) {
    return <div>Loading...</div>;
  }

  const itemsPerPage = 20;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageItems = stockData.slice(startIndex, endIndex);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  return (
    <div className="stock-table-container">
      <div className="table-heading">
        <h1>Stock Trends</h1>
      </div>
      <div className="table-content">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Exchange</th>
            <th>Name</th>
            <th>Volume</th>
            <th>Change</th>
            <th>Change Percent</th>
            <th>Previous Close</th>
            <th>-Price-</th>
            <th>50-Day Avg Price</th>
            <th>200-Day Avg Price</th>
            <th>Year Low</th>
            <th>Year High</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {currentPageItems.map(stock => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.exchange}</td>
              <td>{stock.name}</td>
              <td>{stock.volume}$</td>
              <td style={{ color: stock.change < 0 ? 'red' : 'green' }}>
                {stock.change} {stock.change < 0 ? '↓' : '↑'}
              </td>
              <td style={{ color: stock.changesPercentage < 0 ? 'red' : 'green' }}>
                {stock.changesPercentage.toFixed(2)}% {stock.changesPercentage < 0 ? '↓' : '↑'}
              </td>
              <td style={{ color: stock.previousClose > stock.price ? 'red' : 'green' }}>
                {stock.previousClose} {stock.previousClose > stock.price ? '↓' : '↑'}
              </td>
              <td style={{ color: stock.price > stock.priceAvg50 ? 'green' : stock.price < stock.priceAvg50 ? 'red' : 'black' }}>
                {stock.price.toFixed(3)} {stock.price > stock.priceAvg50 ? '↑' : stock.price < stock.priceAvg50 ? '↓' : ''}
              </td>
              <td style={{ color: stock.price > stock.priceAvg200 ? 'green' : stock.price < stock.priceAvg200 ? 'red' : 'black' }}>
                {stock.priceAvg50.toFixed(4)}
              </td>
              <td style={{ color: stock.price > stock.priceAvg200 ? 'green' : stock.price < stock.priceAvg200 ? 'red' : 'black' }}>
                {stock.priceAvg200.toFixed(4)}
              </td>
              <td style={{ color: 'black'}}>{stock.yearLow}</td>
              <td style={{ color: 'black'}}>{stock.yearHigh}</td>
              <td><Button variant="light" onClick={() => addItemToCart(stock)}>+</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

        <Pagination>
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {Array.from({ length: Math.ceil(stockData.length / itemsPerPage) }).map((_, index) => (
            <Pagination.Item
              key={index}
              onClick={() => handlePageChange(index + 1)}
              active={index + 1 === currentPage}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(stockData.length / itemsPerPage)} />
        </Pagination>
      </div>
    </div>
  );
}
export default StockTable;
