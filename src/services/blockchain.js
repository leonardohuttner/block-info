import { apiBlockChain } from "src/boot/axios";

const getDataBlockHash = (block_hash) => {
  const request = apiBlockChain.get(`bloco?id=${block_hash}`);
  return request.then((res) => res.data);
};

const getDataTransation = (tx_hash) => {
  const request = apiBlockChain.get(`transacao?id=${tx_hash}`);
  return request.then((res) => res.data);
};

const getDataAddress = (rawaddr) => {
  const request = apiBlockChain.get(`carteira?id=/${rawaddr}`);
  return request.then((res) => res.data);
};

const getCurrency = (coin) => {
  const request = apiBlockChain.get(`moeda?codigo=${coin}`);
  return request.then((res) => res.data);
};

export { getDataBlockHash, getDataTransation, getDataAddress, getCurrency };
