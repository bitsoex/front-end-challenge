const formatCurrency = (value, decimals) => value.toFixed(decimals).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

const formatTime = (date) => {
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};

export { formatCurrency, formatTime };
