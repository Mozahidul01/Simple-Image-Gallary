import { FC } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="max-w-5xl mx-auto p-6">{children}</div>;
};
