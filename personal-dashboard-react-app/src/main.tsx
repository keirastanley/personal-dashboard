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
import { WidgetPageWrapper } from "./components/shared";
import { PoetryPage } from "./components/Poetry/PoetryPage";
import { IdeasPage } from "./components/Ideas/IdeasPage";
import { PoemPage } from "./components/Poetry/PoemPage";
import { PageNavWrapper } from "./components/PageNavWrapper";
import { pages } from "./constants";
import { DiaryPage } from "./components/Diary/DiaryPage";
import { Diary } from "./components/Diary/Diary";

const routes = [
  {
    path: "/",
    index: true,
    element: <App />,
  },
  {
    path: pages.tasks,
    element: (
      <PageNavWrapper>
        <WidgetPageWrapper>
          <Tasks />
        </WidgetPageWrapper>
      </PageNavWrapper>
    ),
  },
  {
    path: pages.favourites,
    element: (
      <PageNavWrapper>
        <WidgetPageWrapper>
          <Favourites />
        </WidgetPageWrapper>
      </PageNavWrapper>
    ),
  },
  {
    path: pages.gallery,
    element: (
      <PageNavWrapper>
        <GalleryPage />
      </PageNavWrapper>
    ),
  },
  {
    path: `${pages.gallery}/:id`,
    element: (
      <PageNavWrapper>
        <ImagePage />
      </PageNavWrapper>
    ),
  },
  {
    path: pages.ideas,
    element: (
      <PageNavWrapper>
        <WidgetPageWrapper>
          <IdeasPage />
        </WidgetPageWrapper>
      </PageNavWrapper>
    ),
  },
  {
    path: "diary",
    element: <Diary />,
  },
  {
    path: pages.poetry,
    element: (
      <PageNavWrapper>
        <PoetryPage />
      </PageNavWrapper>
    ),
  },
  {
    path: `${pages.poetry}/:id`,
    element: (
      <PageNavWrapper>
        <PoemPage />
      </PageNavWrapper>
    ),
  },
  {
    path: pages.goals,
    element: (
      <PageNavWrapper>
        <WidgetPageWrapper>
          <Goals />
        </WidgetPageWrapper>
      </PageNavWrapper>
    ),
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
