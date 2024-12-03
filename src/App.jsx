import { RouterProvider } from "react-router-dom";
import mRouter from "./routers/Router";

function App() {
  return <RouterProvider router={mRouter}></RouterProvider>;
}

export default App;
