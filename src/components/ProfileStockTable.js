import { Table, Button } from 'react-bootstrap';
import { SaleStock } from '../components/Api';
import { getPriceBySymbol } from '../Cache';

function ProfileStockTable({ stockData, onDataChange, amount, updateAmount }) {
  

  const handleSellClick = async (stock) => {
    
    const currentPrice = getPriceBySymbol(stock.symbol);
    if (currentPrice !== undefined) {
      const data = { ...stock, currentPrice };
      updateAmount(amount+(currentPrice*stock.quantity));
      await SaleStock(data);
    } else {
      console.log(`Cache'de ${stock.symbol} sembolü için kayıt bulunamadı.`);
    }
    
    onDataChange();

  };

  return (
    <div className="stock-table-container">
      <div className="table-heading">
        <h1>Stocks Owned</h1>
      </div>
      <div className="table-content">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Purchased Price</th>
              <th>Current Price</th>
              <th>Profit/Loss</th>
              <th>Sell</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map(stock => {
              const currentPrice = getPriceBySymbol(stock.symbol);
              const profitLoss = (currentPrice !== undefined) ? (currentPrice * stock.quantity) - stock.price : 0;

              return (
                <tr key={stock.symbol}>
                  <td>{stock.symbol !==null ? stock.symbol : ''}</td>
                  <td>{stock.name}</td>
                  <td>{stock.type}</td>
                  <td>{stock.quantity}</td>
                  <td>{stock.price !==null ? stock.price.toFixed(2) : ''}$</td>
                  <td>{currentPrice !==null ? currentPrice.toFixed(2) : ''}$</td>
                  <td>
                    <li style={{ color: profitLoss > 0 ? 'green' : 'red' }}>
                      {profitLoss !== null ? profitLoss.toFixed(2) : ''}
                    </li>
                  </td>
                  <td>
                    <Button variant="warning" onClick={() => handleSellClick(stock)}>
                      Sell
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ProfileStockTable;
