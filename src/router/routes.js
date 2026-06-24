const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{ path: "/login", component: () => import("pages/Login.vue") }],
  },
  {
    path: "/carteira",
    component: () => import("layouts/LayoutSearch.vue"),
    children: [
      { path: "", component: () => import("pages/carteira/WalletIndex.vue") },
      {
        path: ":addr",
        component: () => import("pages/carteira/WalletBalance.vue"),
      },
    ],
  },
  {
    path: "/transacao",
    component: () => import("layouts/LayoutSearch.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/transacao/TransacaoIndex.vue"),
      },
      {
        path: ":txid",
        component: () => import("pages/transacao/BlockTransacao.vue"),
      },
    ],
  },
  {
    path: "/help",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Help.vue") }],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
