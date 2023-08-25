// Cache.js
const cache = {};

const listeners = {};

export const setCache = (key, value) => {
  cache[key] = value;
  // Cache'e veri eklendiğinde, dinleyicilere haber ver
  if (listeners[key]) {
    listeners[key].forEach(listener => listener(value));
  }
};

export const getCache = (key) => {
  return cache[key];
};

export const getPriceBySymbol = (symbol) => {
  const data = getCache('stockData'); // Veriyi doğrudan 'stockData' anahtarından alıyoruz
  if (data) {
    const symbolData = data.find(item => item.symbol === symbol);
    if (symbolData && symbolData.price !== undefined) {
      return symbolData.price;
    }
  }
  
  // Eğer veri bulunamazsa veya price bilgisi eksikse, isteğinize uygun bir değer döndürebilirsiniz
  return 0; 
};

export const addCacheListener = (key, listener) => {
  if (!listeners[key]) {
    listeners[key] = [];
  }
  listeners[key].push(listener);
};
