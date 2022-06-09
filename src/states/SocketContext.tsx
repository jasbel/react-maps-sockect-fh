import React, { ReactNode } from "react";
import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";

interface ICreateContext {
  socket?: any;
  online?: boolean;
}

export const SocketContext = createContext<ICreateContext>({});

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { socket, online } = useSocket("http://localhost:8080");

  return <SocketContext.Provider value={{ socket, online }}>{children}</SocketContext.Provider>;
};
