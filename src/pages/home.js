import React from 'react';
import  {fetchAndCacheStockData} from '../components/Api';
import StockTable from '../components/StockTable';
import NavBar from '../components/Navbar';
import { useGlobal } from '../context/GlobalContext';
import { getCache } from '../Cache';
import { useEffect } from 'react';

function Home() {
    const {cartItems, addItemToCart} = useGlobal([]);  
    const cachedStockData = getCache('stockData');

    useEffect(() => {
      fetchAndCacheStockData();
      
    }, []);

    return (
      <div className="App">
        <NavBar cartItems={cartItems} />
        <StockTable stockData={cachedStockData} addItemToCart={addItemToCart}/>
      </div>
    );
  }
  
  export default Home;