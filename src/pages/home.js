import React from 'react';
import  {fetchAndCacheStockData} from '../components/Api';
import StockTable from '../components/StockTable';
import NavBar from '../components/Navbar';
import { useGlobal } from '../context/GlobalContext';
import { useEffect, useState } from 'react';


function Home() {
  const {cartItems, addItemToCart} = useGlobal([]);  
  const [ApiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async  () => {
      try {
        const response =  await fetchAndCacheStockData();
        setApiData(response); 
      } catch (error) {
        console.error('Error fetching data from home.js: ', error);
      }
    };

    
    fetchData(); // Eğer ApiData boşsa veriyi çek ve setApiData ile state'i güncelle
  }, []);

  return (
    <div className="App">
      <NavBar cartItems={cartItems} />
      <StockTable stockData={ApiData} addItemToCart={addItemToCart}/>
    </div>
  );
}  
export default Home;