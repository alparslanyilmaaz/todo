import { ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
  title: string;
}

export const AuthWrapper = ({ children, title }: Props) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-6 py-10 bg-white lg:px-10 rounded-2xl">
        <h1 className="mb-8 text-3xl font-bold">
          {title}
        </h1>
        {children}
      </div>
    </div>
  )
};