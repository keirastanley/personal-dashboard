import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./Routes/root";
import AboutPage from "./Routes/About/about-page";
import TasksPage from "./Routes/Tasks/tasks";
import FavouritesPage from "./Routes/Favourites/favourites";
import GalleryPage from "./Components/Gallery/GalleryPage";
import GoalsPage from "./Routes/Goals/goals";
import PoetryPage from "./Routes/Poetry/poetry";
import IdeasPage from "./Routes/Ideas/ideas";
import HelpPage from "./Routes/Help/help";
import ErrorPage from "./Routes/Error/error-page";
import PageNotFound from "./Routes/Error/page-not-found";
import { Main } from "./Components/Main";
import { element } from "prop-types";
import { ImagePage } from "./Components/Gallery/ImagePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "tasks",
        element: <TasksPage />,
      },
      {
        path: "favourites",
        element: <FavouritesPage />,
      },
      {
        path: "gallery",
        element: <GalleryPage />,
      },
      { path: "gallery/:id", element: <ImagePage /> },
      {
        path: "ideas",
        element: <IdeasPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
      {
        path: "poetry",
        element: <PoetryPage />,
      },
      {
        path: "goals",
        element: <GoalsPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
