import { boot } from "quasar/wrappers";
import axios from "axios";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const apiBlockChain = axios.create({
  baseURL: "https://blockchain.info/",
});
const apiCoin = axios.create({
  baseURL: "https://economia.awesomeapi.com.br/json/",
});

const apiViaWallet = axios.create({
  baseURL:"https://explorer.viawallet.com/res/btc/"
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = apiBlockChain;
  app.config.globalProperties.$api = apiCoin;
});

export { apiBlockChain, apiCoin, apiViaWallet };
