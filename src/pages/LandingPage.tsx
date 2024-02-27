import { Link } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

export default function LandingPage() {
    return (
      <div> 
        <Navbar currentPage={"landingpage"}/>
        <h1>Landing Page</h1>
        <Link to="/login"> Log In </Link>
      </div>
    )
  }