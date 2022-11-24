import React from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}


function AppLayout({ children }: AppLayoutProps){
  return (
    <>
      {children}
    </>
  );
}

export default AppLayout;
