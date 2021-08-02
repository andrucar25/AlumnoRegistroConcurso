import React from 'react'
import '../styles/Footer.css';
const Footer = () => {
    return (
        <div className="footer mt-5">
            <div className="p-4 d-flex justify-content-around text-light">    
            <div style={{width:"120px",height:"120px"}}>
            {/* <img src="https://pbs.twimg.com/profile_images/1613248543/epis_400x400.png" style={{width:"50%"}}/> */}
            </div>
            <div>
            <i className="fab fa-facebook iconi pr-3"></i>
            <i className="fab fa-youtube iconi pr-3"></i>
            </div>
            </div>
        </div>
    )
}

export default Footer
