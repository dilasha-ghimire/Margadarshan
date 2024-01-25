import '../css-files/adminHeader.css';
import {useEffect} from "react";

const AdminHeader: React.FC = () => {

    useEffect(() => {
        document.title = "Admin Header | Margadarshan"
    }, [])

    return (
        <>
            <div className="header-admin">
                <div className="header-left-admin">
                    <img className="logo-admin" src="src\assets\AboutPage\Margadarshan logo.png"></img>
                    <p className="margadarshan-admin">MARGADARSHAN</p>
                </div>
            </div>
        </>
    )
}

export default AdminHeader;