import Header from './Header';
import "../css-files/roadmap.css";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Roadmap() {
    useEffect(() => {
        return () => {
            document.body.style.backgroundColor = null;
        };
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = "#152039";
    }, []);

    const [sideNavWidth, setSideNavWidth] = useState<string>('0');

    const openSideNav = () => {
        setSideNavWidth('350px');
    };

    const closeSideNav = () => {
        setSideNavWidth('0');
    };

    return (
        <>
            <Header />

            <div className='sidebar-roadmap' style={{ width: sideNavWidth }}>
                <a href="javascript:void(0)" className="close-sidebar-btn-roadmap" onClick={closeSideNav}><FontAwesomeIcon icon={faArrowLeft}/></a>
                <p className='sidebar-title-roadmap'>Enter the following details to construct your journey to the United States</p>

                <div>
                    
                </div>
            </div>

            <div className='centre-roadmap'>
                <button className='open-sidebar-btn-roadmap' onClick={openSideNav}><FontAwesomeIcon icon={faArrowRight} /></button>
                <img className='roadmap-img' src='src\assets\Roadmap\roadmap.png'></img>
            </div>
        </>
    );
}

export default Roadmap;