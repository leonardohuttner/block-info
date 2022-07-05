const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") }
    ],
  },
  {
    path: "/carteira",
    component: () => import("layouts/LayoutSearch.vue"),
    children: [
      { path: "", component: () => import("pages/carteira/WalletIndex.vue") },
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
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
