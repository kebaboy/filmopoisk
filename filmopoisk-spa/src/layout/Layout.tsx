import { Outlet } from "react-router-dom";
import { Header } from "../UI/Header/Header";

interface LayoutProps {
    children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = () => {
    return (
        <>
            <Header></Header>
            <main style={{ paddingTop: '85.5px', flexGrow: '1', display: 'flex', flexDirection: 'column'}}>
                <Outlet />
            </main>
        </>
    );
}
