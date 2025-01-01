import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      {children}
    </div>
  );
}

export default AuthLayout;
