import React from 'react';

import NavBar from "../components/Navbar";
import ProfileStockTable from '../components/ProfileStockTable';
import ProfileHistoryTable from '../components/ProfileHistoryTable';
import WalletInfo from '../components/WalletInfo';

import { useEffect, useState } from 'react';
import { useGlobal } from '../context/GlobalContext';
import { fetchProfileStockData, fetchProfileHistoryData } from '../components/Api';


function Profile() {

  const { cartItems, amount, updateAmount} = useGlobal();

  const [profileStock, setProfileStock] = useState([]);

  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const [triggerFetch, setTriggerFetch] = useState(true);

  const fetchData = async () => {
      const newProfileStockData = await fetchProfileStockData();
      const newProfileHistoryData = await fetchProfileHistoryData();
      
      setProfileStock(newProfileStockData);
      setPurchaseHistory(newProfileHistoryData);
  };

  useEffect(() => {
    if (triggerFetch) {
      fetchData();
      setTriggerFetch(false); // Tetiklemeyi sıfırla
    }
  }, [triggerFetch]);

  const handleDataChange = () => {
    setTriggerFetch(true);
  };
  
    return (
      <div className="App">
        <NavBar cartItems={cartItems}/>
        <WalletInfo Amount={amount} profileStock={profileStock}/>
        <ProfileStockTable stockData={profileStock} onDataChange={handleDataChange} amount={amount} updateAmount={updateAmount}/>
        <ProfileHistoryTable historyData={purchaseHistory}/>
      </div>
    );
    
}
export default Profile;