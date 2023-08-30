import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { getPriceBySymbol } from '../Cache';


function WalletInfo({Amount, profileStock}) {

  var totalStockValue = 0;

  profileStock.forEach(stock => {
    const price = getPriceBySymbol(stock.symbol);
    totalStockValue += price * stock.quantity;
  });

  return (
    <Container className='wallet-container'>
      <Row>
        <Col md={7}>
            <img src="https://r.resimlink.com/_i3u6xZT4mN.jpg" alt="resme alternatif yazı" className='profile-image'></img>
        </Col>
        <Col md={5} className="d-flex justify-content-baseline">
            <div>
                <h4>USD: {Amount.toFixed(2)}$</h4>
                <h4>Total Stock Value: {totalStockValue.toFixed(2)}$</h4>
            </div>
        </Col>
      </Row>
    </Container>
  );
}

export default WalletInfo;