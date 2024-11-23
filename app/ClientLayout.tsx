"use client";

import { ThemeProvider } from "@emotion/react";
import { solvedThemes, SolvedGlobalStyles } from "@solved-ac/ui-react";
import { PropsWithChildren } from "react";

const ClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ThemeProvider theme={solvedThemes.light}>
        <SolvedGlobalStyles />
        {children}
      </ThemeProvider>
    </>
  );
};

export default ClientLayout;
