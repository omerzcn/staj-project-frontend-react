import React from 'react';
import  {fetchAndCacheStockData} from '../components/Api';
import StockTable from '../components/StockTable';
import NavBar from '../components/Navbar';
import { useGlobal } from '../context/GlobalContext';
import { useEffect, useState } from 'react';


function Home() {
  const {cartItems, addItemToCart} = useGlobal([]);  
  const [ApiData, setApiData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState([1]);

  useEffect(() => {
    const fetchData = async  (currentPage,itemsPerPage) => {
      try {
        const response =  await fetchAndCacheStockData(currentPage,itemsPerPage);
        setApiData(response); 
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching data from home.js: ', error);
      }
    };

    fetchData(currentPage,itemsPerPage); // Eğer ApiData boşsa veriyi çek ve setApiData ile state'i güncelle
  }, [currentPage]);

  return (
    <div className="App">
      <NavBar cartItems={cartItems} />
      <StockTable stockData={ApiData} addItemToCart={addItemToCart} currentPage={currentPage} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
    </div>
  );
}  
export default Home;