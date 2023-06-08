export default [
  {
    path: "/",
    redirect: "",
    meta: {
      layout: "DefaultLayout",
      requiresAuth: false,
    },
  },
  {
    path: "/",
    name: "landing",
    meta: {
      layout: "DefaultLayout",
      title: "Shpock  | The Joy of Selling",
      requiresAuth: false,
    },
    component: () => import("../views/LandingView.vue"),
  },
  {
    path: "/home",
    name: "home",
    meta: {
      layout: "DefaultLayout",
      title: "Shpock  | The Joy of Selling",
      requiresAuth: true,
    },
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      layout: "DefaultLayout",
      title: "Shpock  | The Joy of Selling",
      requiresAuth: true,
    },
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/create-exam",
    name: "createExam",
    meta: {
      layout: "DefaultLayout",
      title: "Shpock  | The Joy of Selling",
      requiresAuth: true,
    },
    component: () => import("../views/CreateExamView.vue"),
  },
  {
    path: "/test-list",
    name: "listOfTest",
    meta: {
      layout: "DefaultLayout",
      title: "Shpock  | The Joy of Selling",
      requiresAuth: true,
    },
    component: () => import("../views/ListOfTestView.vue"),
  },
  {
    path: "/question-bank",
    name: "questionBank",
    meta: {
      layout: "DefaultLayout",
      title: "Shpock  | The Joy of Selling",
      requiresAuth: true,
    },
    component: () => import("../views/QuestionBankView.vue"),
  },
  {
    path: "/detail-test",
    name: "detailTest",
    meta: {
      layout: "DefaultLayout",
      title: "Shpock  | The Joy of Selling",
      requiresAuth: true,
    },
    component: () => import("../views/DetailTestView.vue"),
  },
  {
    path: "/edit-test",
    name: "editTest",
    meta: {
      layout: "DefaultLayout",
      title: "Shpock  | The Joy of Selling",
      requiresAuth: true,
    },
    component: () => import("../views/EditTestView.vue"),
  },
  {
    path: "/join-test",
    name: "joinTest",
    meta: {
      layout: "DefaultLayout",
      title: "Shpock  | The Joy of Selling",
      requiresAuth: true,
    },
    component: () => import("../views/JoinTestView.vue"),
  },
  {
    path: "/login-register/:initialView?",
    name: "loginRegister",
    meta: {
      layout: "FullScreenLayout",
      title: "Shpock  | The Joy of Selling",
      requiresAuth: false,
    },
    component: () => import("../views/LoginRegisterView.vue"),
  },
  {
    path: "/waiting-room",
    name: "waitingRoom",
    meta: {
      layout: "DefaultLayout",
      title: "Shpock  | The Joy of Selling",
      requiresAuth: true,
    },
    component: () => import("../views/WaitingRoomView.vue"),
  },
];
