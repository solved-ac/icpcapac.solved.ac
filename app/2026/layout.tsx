import { PropsWithChildren } from "react";
import ClientLayout from "./ClientLayout";

const Layout = ({ children }: PropsWithChildren) => {
  return <ClientLayout>{children}</ClientLayout>;
};

export default Layout;
