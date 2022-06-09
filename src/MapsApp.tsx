import React from "react";
import MapsPage from "./pages/MapsPage";
import { SocketProvider } from "./states/SocketContext";

const MapsApp = () => {
  return (
    <SocketProvider>
      <div>
        <MapsPage />
      </div>
    </SocketProvider>
  );
};

export default MapsApp;
