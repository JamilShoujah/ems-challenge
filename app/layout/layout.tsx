import { LayoutProps } from "~/models/interfaces/layout";
import NavigationMenu from "../components/navigationMenu";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <NavigationMenu />
      <main style={{ marginTop: "60px" }}>{children}</main>{" "}
    </div>
  );
};

export default Layout;
