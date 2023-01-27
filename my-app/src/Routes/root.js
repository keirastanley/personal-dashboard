import Nav from "../Components/Nav bar/index"
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

export default function Root(){
    return <div className="page-container">
                <Nav/>
                <Header />
                    <Outlet />
                <Footer/>
        </div>
}