import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

function LoginLayout({ children }: AppLayoutProps) {
  return <>{children}</>;
}

export default LoginLayout;
