import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Loading from "../components/Loading";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Marathon from "../pages/Marathon";
import Profile from "../pages/Profile";
import PrivateRoute from "../Provider/PrivateRoute";
import MarathonDetails from "../pages/MarathonDetails";
import DashBoard from "../pages/DashBoard";
import AddMarathon from "../pages/AddMarathon";
import MarathonList from "../pages/MarathonList";
import ApplyList from "../pages/ApplyList";
import MarathonRegistration from "../pages/MarathonRegistration";
import Tips from "../pages/Tips";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import TermsOfUse from "../pages/TermsOfUse";
import PrivacyPolicy from "../pages/PrivacyPolicy";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    hydrateFallbackElement: <Loading></Loading>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/homeMarathons`),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
      {
        path: "terms",
        element: <TermsOfUse></TermsOfUse>,
      },
      {
        path: "privacy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "marathon",
        element: <Marathon></Marathon>
      },
      {
        path: "marathonDetail/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/allMarathon/${params.id}`),
        element: (
          <PrivateRoute>
            <MarathonDetails></MarathonDetails>
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "tips",
        element: (
          <PrivateRoute>
            <Tips></Tips>
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard></DashBoard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/dashboard/addMarathon",
        element: <AddMarathon></AddMarathon>,
      },
      {
        path: "/dashboard/marathonList",
        element: <MarathonList></MarathonList>,
      },
      {
        path: "/dashboard/applyList",
        element: <ApplyList></ApplyList>,
      },
    ],
  },
  {
    path: "/marathon/registration/:id",
    element: (
      <PrivateRoute>
        <MarathonRegistration></MarathonRegistration>
      </PrivateRoute>
    ),
    loader: ({ params }) =>
      fetch(`${import.meta.env.VITE_API_URL}/allMarathon/${params.id}`),
    hydrateFallbackElement: <Loading></Loading>,
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
