import { apiBlockChain, apiViaWallet } from "src/boot/axios";
const formato = "json";

const getDataBlockHash = (block_hash) => {
  const request = apiBlockChain.get(`rawblock/${block_hash}`);
  return request.then((res) => res.data);
};

const getDataTransation = (tx_hash) => {
  const request = apiViaWallet.get(`transactions/${tx_hash}`);
  return request.then((res) => res.data);
};

const getDataAddress = (rawaddr) => {
  const request = apiBlockChain.get(`rawaddr/${rawaddr}`);
  return request.then((res) => res.data);
};

export { getDataBlockHash, getDataTransation, getDataAddress };
