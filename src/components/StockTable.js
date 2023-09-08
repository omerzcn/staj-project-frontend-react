import { useState, useEffect } from 'react';
import { Button,Pagination,Table} from 'react-bootstrap';


function StockTable({stockData, addItemToCart, currentPage, itemsPerPage, setCurrentPage, totalPages, setSortProperty, sortProperty,
   setSortDirect, sortDirect}) {
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

  function handleColumnClick(columnName) {

    if(columnName === sortProperty){
      setSortDirect(sortDirect === "ASC" ? "DESC" : "ASC");
    }else{
      setSortDirect("ASC");
      setSortProperty(columnName);
    }
    
  };

  return (
    <div className="stock-table-container">
      <div className="table-heading">
        <h1>Stock Trends</h1>
      </div>
      <div className="table-content">
      <Table striped bordered hover variant="dark" className='stockTable'>
        <thead>
          <tr>
            <th onClick={()=>handleColumnClick("symbol")}>Symbol{sortProperty === "symbol" ? (sortDirect === "ASC" ? " ↑ " : " ↓ ") : "" }</th>
            <th onClick={()=>handleColumnClick("exchange")}>Exchange{sortProperty === "exchange" ? (sortDirect === "ASC" ? " ↑ " : " ↓ ") : "" }</th>
            <th onClick={()=>handleColumnClick("name")}>Name{sortProperty === "name" ? (sortDirect === "ASC" ? " ↑ " : " ↓ ") : "" }</th>
            <th onClick={()=>handleColumnClick("volume")}>Volume{sortProperty === "volume" ? (sortDirect === "ASC" ? " ↑ " : " ↓ ") : "" }</th>
            <th onClick={()=>handleColumnClick("change")}>Change{sortProperty === "change" ? (sortDirect === "ASC" ? " ↑ " : " ↓ ") : "" }</th>
            <th onClick={()=>handleColumnClick("changesPercentage")}>Change Percent{sortProperty === "changesPercentage" ? (sortDirect === "ASC" ? " ↑ " : " ↓ ") : "" }</th>
            <th onClick={()=>handleColumnClick("previousClose")}>Previous Close{sortProperty === "previousClose" ? (sortDirect === "ASC" ? " ↑ " : " ↓ ") : "" }</th>
            <th onClick={()=>handleColumnClick("price")}>-Price-{sortProperty === "price" ? (sortDirect === "ASC" ? " ↑ " : " ↓ ") : "" }</th>
            <th onClick={()=>handleColumnClick("priceAvg50")}>50-Day Avg Price{sortProperty === "priceAvg50" ? (sortDirect === "ASC" ? " ↑ " : " ↓ ") : "" }</th>
            <th onClick={()=>handleColumnClick("priceAvg200")}>200-Day Avg Price{sortProperty === "priceAvg200" ? (sortDirect === "ASC" ? " ↑ " : " ↓ ") : "" }</th>
            <th onClick={()=>handleColumnClick("yearLow")}>Year Low{sortProperty === "yearLow" ? (sortDirect === "ASC" ? " ↑ " : " ↓ ") : "" }</th>
            <th onClick={()=>handleColumnClick("yearHigh")}>Year High{sortProperty === "yearHigh" ? (sortDirect === "ASC" ? " ↑ " : " ↓ ") : "" }</th>
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
                {stock.change !== null ? `${stock.change < 0 ? '' : '+'}${stock.change}` : ''}
              </td>
              <td style={{ color: stock.changesPercentage < 0 ? 'red' : 'green' }}>
                {stock.changesPercentage !== null ? `${stock.changesPercentage < 0 ? '' : '+'}${stock.changesPercentage.toFixed(2)}% ` : ''}
              </td>
              <td style={{ color: stock.previousClose > stock.price ? 'red' : 'green' }}>
                {stock.previousClose !== null ? `${stock.previousClose > stock.price ? '-' : '+'}${stock.previousClose}` : ''}
              </td>
              <td style={{ color: stock.price !== null && stock.priceAvg50 !== null ? (stock.price > stock.priceAvg50 ? 'green' : stock.price < stock.priceAvg50 ? 'red' : 'black') : 'black' }}>
                {stock.price !== null ? `${stock.price > stock.priceAvg50 ? '+' : stock.price < stock.priceAvg50 ? '-' : ''}${stock.price.toFixed(3)}` : ''}
              </td>
              <td style={{ color: stock.price !== null && stock.priceAvg200 !== null ? (stock.price > stock.priceAvg200 ? 'green' : stock.price < stock.priceAvg200 ? 'red' : 'black') : 'black' }}>
                {stock.priceAvg50 !== null ? stock.priceAvg50.toFixed(3) : ''}
              </td>
              <td style={{ color: stock.price !== null && stock.priceAvg200 !== null ? (stock.price > stock.priceAvg200 ? 'green' : stock.price < stock.priceAvg200 ? 'red' : 'black') : 'black' }}>
                {stock.priceAvg200 !== null ? stock.priceAvg200.toFixed(3) : ''}
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
