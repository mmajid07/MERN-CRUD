import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { User } from "./Components/GetUser/User";
import AddUser from "./Components/AddUser/AddUser";
import EditUser from "./Components/UpdateUser/EditUser";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <AddUser />,
    },
    {
      path: "/update/:id",
      element: <EditUser />,
    },
  ]);
  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default App;
