"use client";

import { ThemeProvider } from "@emotion/react";
import { solvedThemes, SolvedGlobalStyles, Space } from "@solved-ac/ui-react";
import { PropsWithChildren } from "react";
import Footer from "./components/Footer";

const ClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ThemeProvider theme={solvedThemes.light}>
        <SolvedGlobalStyles />
        {children}
        <Space h={64} />
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default ClientLayout;
