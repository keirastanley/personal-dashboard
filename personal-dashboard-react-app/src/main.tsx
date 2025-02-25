import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App";
import Tasks from "./components/Tasks";
import Favourites from "./components/Favourites";
import GalleryPage from "./components/Gallery/GalleryPage";
import { ImagePage } from "./components/Gallery/ImagePage";
import Ideas from "./components/Ideas/index";
import Goals from "./components/Goals/index";

const routes = [
  {
    path: "/",
    index: true,
    element: <App />,
  },
  {
    path: "tasks",
    element: <Tasks />,
  },
  {
    path: "favourites",
    element: <Favourites />,
  },
  {
    path: "gallery",
    element: <GalleryPage />,
  },
  { path: "gallery/:id", element: <ImagePage /> },
  {
    path: "ideas",
    element: <Ideas />,
  },
  // {
  //   path: "help",
  //   element: <HelpPage />,
  // },
  // {
  //   path: "poetry",
  //   element: <PoetryPage />,
  // },
  {
    path: "goals",
    element: <Goals />,
  },
  // {
  //   path: "about",
  //   element: <AboutPage />,
  // },
  // {
  //   path: "*",
  //   element: <PageNotFound />,
  // },
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            index={route.index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
