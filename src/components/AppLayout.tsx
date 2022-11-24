import React from "react";
import NavBar from "./Nav/NavBar";

interface AppLayoutProps {
  children: React.ReactNode;
}


function AppLayout({ children }: AppLayoutProps){
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default AppLayout;
