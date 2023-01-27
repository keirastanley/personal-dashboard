import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Routes/root';
import HomePage from './Routes/homepage';
import AboutPage from './Routes/About/about-page';
import TasksPage from './Routes/Tasks/tasks';
import FavouritesPage from './Routes/Favourites/favourites'
import GalleryPage from './Routes/Gallery/gallery';
import GoalsPage from './Routes/Goals/goals';
import PoetryPage from './Routes/Poetry/poetry';
import IdeasPage from './Routes/Ideas/ideas';
import HelpPage from './Routes/Help/help';
import ErrorPage from './Routes/Error/error-page';
import PageNotFound from './Routes/Error/page-not-found';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage/>,
      },
      {
        path: "tasks",
        element: <TasksPage/>,
      },
      {
        path: "favourites",
        element: <FavouritesPage/>,
      },
      {
        path: "gallery",
        element: <GalleryPage/>,
      },
      {
        path: "ideas",
        element: <IdeasPage/>,
      },
      {
        path: "help",
        element: <HelpPage/>,
      },
      {
        path: "poetry",
        element: <PoetryPage/>,
      },
      {
        path: "goals",
        element: <GoalsPage/>,
      },
      {
        path: "about",
        element: <AboutPage/>,
      },
      {
        path: "*",
        element: <PageNotFound />,
      }
    ]
  },
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
