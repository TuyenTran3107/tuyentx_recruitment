import { Navigate } from "react-router-dom";
import LayoutDefault from "../components/Layout/LayoutDefault";
import Company from "../pages/Company";
import CompanyDetail from "../pages/CompanyDetail";
import Home from "../pages/Home";
import JobDetail from "../pages/JobDetail";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register";
import Search from "../pages/Search";
import PrivateRoutes from "../components/PrivateRoutes";
import LayoutAdmin from "../components/Layout/LayoutAdmin";
import Dashboard from "../pages/Dashboard";
import InfoCompany from "../pages/InfoCompany";
import JobManage from "../pages/JobManage";
import CVManage from "../pages/CVManage";
import CreateJob from "../pages/JobManage/CreateJob";

export const routes = [
  //Public
  {
    path: '/',
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "logout",
        element: <Logout />
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "jobs/:id",
        element: <JobDetail />
      },
      {
        path: "company",
        element: <Company />
      },
      {
        path: "company/:id",
        element: <CompanyDetail />
      },
      {
        path: "*",
        element: <Navigate to="/" />
      },
    ],
  },


  //Private
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          {
            path: "admin",
            element: <Dashboard />
          },
          {
            path: "info-company",
            element: <InfoCompany />
          },
          {
            path: "job-manage",
            element: <JobManage />
          },
          {
            path: "create-job",
            element: <CreateJob />
          },
          {
            path: "detail-job/:id",
            // element: <JobDetailAdmin />
          },

          {
            path: "cv-manage",
            element: <CVManage />
          },
          {
            path: "detail-cv/:id",
            // element: <CVDetail /> 
          },

        ]
      }
    ]
  }
]