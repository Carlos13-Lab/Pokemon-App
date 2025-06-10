import "../styles/LandingPage/LandingPage.css"; // Adjust the path as necessary 
import {Link} from "react-router-dom";

export default function LandingPage(){

    return(
        <div className='body-landing'>
            
            <div>
            <Link to ='/home'>
                <button className='btn-landing'>START</button>
            </Link>
            </div>
        </div>
    )
}