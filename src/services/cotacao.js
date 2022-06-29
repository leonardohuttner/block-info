import { apiCoin } from "src/boot/axios";

const getCurrency = (coin) => {
  const request = apiCoin.get(`last/${coin}`);
  return request.then((res) => res.data);
};

export { getCurrency };
