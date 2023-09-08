import React from 'react';
import  {fetchAndCacheStockData} from '../components/Api';
import StockTable from '../components/StockTable';
import NavBar from '../components/Navbar';
import { useGlobal } from '../context/GlobalContext';
import { useEffect, useState } from 'react';


function Home() {
  const {cartItems, addItemToCart} = useGlobal([]);  
  const [ApiData, setApiData] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState();

  const [sortProperty, setSortProperty] = useState("id");
  const [sortDirect, setSortDirect] = useState("ASC");
  useEffect(() => {
    const fetchData = async  (currentPage,itemsPerPage,sortProperty,sortDirect) => {
      try {
        const response =  await fetchAndCacheStockData(currentPage,itemsPerPage,sortProperty,sortDirect);
        setApiData(response); 
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching data from home.js: ', error);
      }
    };

    fetchData(currentPage,itemsPerPage,sortProperty,sortDirect); // Eğer ApiData boşsa veriyi çek ve setApiData ile state'i güncelle
  }, [currentPage,sortProperty,sortDirect]);

  return (
    <div className="App">
      <NavBar cartItems={cartItems} />
      <StockTable stockData={ApiData} addItemToCart={addItemToCart} currentPage={currentPage} itemsPerPage={itemsPerPage} 
      setCurrentPage={setCurrentPage} totalPages={totalPages} setSortProperty={setSortProperty} sortProperty={sortProperty}
      setSortDirect={setSortDirect} sortDirect={sortDirect}/>
    </div>
  );
}  
export default Home;