import * as React from "react";

const MainLayoutSidebarContext = React.createContext<{
  onPageItemClick: () => void;
  mini: boolean;
} | null>(null);

export default MainLayoutSidebarContext;
