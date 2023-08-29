import { useState, useEffect } from 'react';
import { Button,Pagination,Table} from 'react-bootstrap';


function StockTable({stockData, addItemToCart, currentPage, itemsPerPage, setCurrentPage, totalPages}) {
  const [loading, setLoading] = useState(true); 
  const [data, setData] = useState([]);

  useEffect(() => {
    if (stockData) {
      setData(stockData.content);
      
      setLoading(false);
    }
  }, [stockData]);

  
  if (loading) {
    return <div className='loading-container'><img src='https://r.resimlink.com/BSpOv9WYtu.gif' alt='loading' className='loading'/></div>;
  }
  
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
          {data.map(stock => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.exchange}</td>
              <td>{stock.name}</td>
              <td>{stock.volume}$</td>
              <td style={{ color: stock.change < 0 ? 'red' : 'green' }}>
                {stock.change !== null ? `${stock.change} ${stock.change < 0 ? '↓' : '↑'}` : ''}
              </td>
              <td style={{ color: stock.changesPercentage < 0 ? 'red' : 'green' }}>
                {stock.changesPercentage !== null ? `${stock.changesPercentage.toFixed(2)}% ${stock.changesPercentage < 0 ? '↓' : '↑'}` : ''}
              </td>
              <td style={{ color: stock.previousClose > stock.price ? 'red' : 'green' }}>
                {stock.previousClose !== null ? `${stock.previousClose} ${stock.previousClose > stock.price ? '↓' : '↑'}` : ''}
              </td>
              <td style={{ color: stock.price !== null && stock.priceAvg50 !== null ? (stock.price > stock.priceAvg50 ? 'green' : stock.price < stock.priceAvg50 ? 'red' : 'black') : 'black' }}>
                {stock.price !== null ? `${stock.price.toFixed(3)} ${stock.price > stock.priceAvg50 ? '↑' : stock.price < stock.priceAvg50 ? '↓' : ''}` : ''}
              </td>
              <td style={{ color: stock.price !== null && stock.priceAvg200 !== null ? (stock.price > stock.priceAvg200 ? 'green' : stock.price < stock.priceAvg200 ? 'red' : 'black') : 'black' }}>
                {stock.priceAvg50 !== null ? stock.priceAvg50.toFixed(4) : ''}
              </td>
              <td style={{ color: stock.price !== null && stock.priceAvg200 !== null ? (stock.price > stock.priceAvg200 ? 'green' : stock.price < stock.priceAvg200 ? 'red' : 'black') : 'black' }}>
                {stock.priceAvg200 !== null ? stock.priceAvg200.toFixed(4) : ''}
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
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            key={index}
            onClick={() => handlePageChange(index + 1)}
            active={index + 1 === currentPage}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>
      </div>
    </div>
  );
}
export default StockTable;
