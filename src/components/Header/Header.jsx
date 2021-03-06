import React from 'react';
import { Link } from 'react-router-dom';
import './styles/style.css';

const Header = () => {
    return (
        <div className="header-area">
            <div className="logo">
                <Link to="/" label="enjoei home">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 158.83 158.83">
                        <g data-name="Layer 1">
                            <path fill="#F05B78" d="M146.11,121.61a1.63,1.63,0,0,0-.74-1L117.73,103.9a1.47,1.47,0,0,0-2,.39,43.72,43.72,0,0,1-72.88,0,1.47,1.47,0,0,0-2-.47c-.86.55-27.63,16.54-27.63,16.54a1.61,1.61,0,0,0-.52,2.26,79.39,79.39,0,0,0,133.1.22,1.59,1.59,0,0,0,.22-1.24"></path>
                            <path fill="#4F2D32" d="M79.41,37.72A41.75,41.75,0,0,1,116.52,60.4H42.31a41.75,41.75,0,0,1,37.1-22.68m78.93,50.54a81.74,81.74,0,0,0,.49-8.85A79.42,79.42,0,0,0,23.26,23.26a79.45,79.45,0,0,0-22.77,65,1.59,1.59,0,0,0,1.63,1.45H156.76a1.58,1.58,0,0,0,1.58-1.43"></path>
                        </g>
                    </svg>
                </Link>
                    
            </div>
        </div>
    );
}
 
export default Header;