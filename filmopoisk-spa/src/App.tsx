import "./App.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import { Layout } from "./layout/Layout";
import { MoviePage } from "./pages/MoviePage/MoviePage";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { Header } from "./UI/Header/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "movie/:movieId",
        element: <MoviePage />,
      }
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  }
])

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
