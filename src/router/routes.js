const routes = [
  {
    path: "/",
    component: () => import("layouts/LayoutSearch.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") }
    ],
  },
  {
    path: "/carteira",
    component: () => import("layouts/LayoutSearch.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/carteira/:addr",
        component: () => import("pages/carteira/WalletBalance.vue"),
      }
    ],
  },
  {
    path: "/transacao",
    component: () => import("layouts/LayoutSearch.vue"),
    children: [
      {
        path: "/transacao/:txid",
        component: () => import("pages/transacao/BlockTransacao.vue"),
      }
      // {
      //   path: "/transacao/:addr",
      //   component: () => import("pages/carteira/WalletBalance.vue"),
      // }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
