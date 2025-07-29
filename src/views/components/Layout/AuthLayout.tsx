import React from "react";
import usjrLogo from "../../../assets/usjr.png";
import scsLogo from "../../../assets/scs.png";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
  rightContent?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  children,
  rightContent,
}) => {
  return (
    <div className="w-screen h-screen flex items-stretch bg-cover bg-center font-sans bg-[#F3F4F6]">
      {/* Left Side */}
      <div className="basis-[55%] flex flex-col justify-center items-center relative bg-[#F3F4F6] bg-cover bg-center shadow-xl">
        <div className="absolute inset-0 bg-white/30 pointer-events-none z-0 rounded-tl-3xl rounded-bl-3xl" />

        <div className="absolute top-3 left-3 z-10 flex flex-row items-center gap-2">
          <img src={usjrLogo} alt="WorkSync Logo" className="w-18 h-18" />
          <img src={scsLogo} alt="WorkSync Logo" className="w-14 h-14 mt-1" />
        </div>

        <div className="w-full px-2 z-10 flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-center mb-2 text-gray-800 w-[320px] mb-10">{title}</h2>
          {children}
        </div>
      </div>

      {/* Right Side */}
      <div className="basis-[45%] flex flex-col justify-center items-center relative p-4 bg-white/0 shadow-xl overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center z-0  bg-[url('/src/assets/right.png')]" />
        <div className="z-10 relative h-full w-full max-w-[420px] flex items-center justify-center">
          {rightContent}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
