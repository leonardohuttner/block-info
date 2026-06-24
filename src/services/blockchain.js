import { apiBlockChain } from "src/boot/axios";

const getDataBlockHash = (block_hash) => {
  const request = apiBlockChain.get(`bloco?id=${block_hash}`);
  return request.then((res) => res.data);
};

const getDataTransation = (tx_hash) => {
  const request = apiBlockChain.get(`transacao?id=${tx_hash}`);
  return request.then((res) => {
    const body = res.data;
    // API may return an array like [{ code:0, data: { ... }, message:'ok' }]
    if (Array.isArray(body) && body.length > 0 && body[0].data) {
      return body[0].data;
    }
    // Otherwise return as-is (backward compatible)
    return body;
  });
};

const getDataAddress = (rawaddr) => {
  const request = apiBlockChain.get(`carteira?id=/${rawaddr}`);
  return request.then((res) => {
    const body = res.data;
    // API may return an array with a single wallet object
    if (Array.isArray(body) && body.length > 0) {
      return body[0];
    }
    return body;
  });
};

const getCurrency = (coin) => {
  const request = apiBlockChain.get(`moeda?codigo=${coin}`);
  return request.then((res) => res.data);
};

export { getDataBlockHash, getDataTransation, getDataAddress, getCurrency };
