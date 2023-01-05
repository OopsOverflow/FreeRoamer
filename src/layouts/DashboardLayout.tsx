import React from "react";
import NavBar from "@components/Nav/NavBar";

interface AppLayoutProps {
  children: React.ReactNode;
}


function DashbordLayout({ children }: AppLayoutProps){
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}

export default DashbordLayout;
