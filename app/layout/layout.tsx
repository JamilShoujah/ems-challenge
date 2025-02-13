import { LayoutProps } from "~/models/interfaces/layout";
import NavigationMenu from "../components/navigationMenu";
import "./index.css";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout-container">
      <NavigationMenu />
      <main className="layout-content">{children}</main>
    </div>
  );
};

export default Layout;
