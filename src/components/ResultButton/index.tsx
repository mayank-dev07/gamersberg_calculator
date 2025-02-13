import React from "react";

type Props = {
  children: React.ReactNode;
};

const ResultButton = ({ children }: Props) => {
  return (
    <button className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
      <span className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#5f317e_0%,#81552e_50%,#5f317e_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-5 py-1 text-lg font-medium text-white backdrop-blur-3xl">
        {children}
      </span>
    </button>
  );
};

export default ResultButton;
