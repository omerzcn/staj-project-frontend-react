import axios from "axios";


//******************Home page to StockTable****************
export async function fetchAndCacheStockData(currentPage, itemsPerPage) {
    try {
      const response = await axios.get('http://localhost:8080/api/stocks1', {
        params: {
          page: currentPage,
          size: itemsPerPage
        }
      });
      const data = response.data;
      console.log('stock data:', data);
      return data; // Sadece content verisini döndür
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Hata fırlat, yukarıdaki try-catch bloğunda yakala
    }
  }


//******************Basket page to buy****************

export async function postProfileStockData(purchaseData){
    axios.post('http://localhost:8080/api/postStock', purchaseData)
        .then(response => {
        console.log('Satın alma başarılı:', response.data);
        })
        .catch(error => {
        console.error('Satın alma hatası:', error);
        console.log('Gönderilen Veri:', purchaseData);
        });
}

//******************Profile page to StockTable and PurchaseHitory****************

export async function fetchProfileStockData() {
    try {
      const response = await axios.get('http://localhost:8080/api/getAll');
      const data = response.data;
      console.log('getAll icin Sunucu Cevabı:', data);
      return data; // data.json yerine sadece data döndürülmeli
    } catch (error) {
      console.error('profilestock verisi alma hatası:', error);
      return []; // Hata durumunda boş bir dizi döndürülebilir veya başka bir hata yönetimi yapılabilir
    }
}
  
export async function fetchProfileHistoryData() {
    try {
        const response = await axios.get('http://localhost:8080/api/getHistory');
        const data = response.data;
        console.log('getHistory icin Sunucu Cevabı:', data);
        return data; // data.json yerine sadece data döndürülmeli
    } catch (error) {
        console.error('profilestock verisi alma hatası:', error);
        return []; // Hata durumunda boş bir dizi döndürülebilir veya başka bir hata yönetimi yapılabilir
    }
}


export async function SaleStock(data) {
    try {
        if (data) {
            const response = await axios.delete('http://localhost:8080/api/deleteStock', {
                data: data,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const responseData = response.data;
            console.log(responseData);
        }
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}

