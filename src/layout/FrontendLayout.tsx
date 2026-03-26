import { Outlet } from "react-router";

import Navbar from "../components/Navbar";

const FrontendLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default FrontendLayout;
