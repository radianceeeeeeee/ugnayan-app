import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './LandingPage.css';

export default function LandingPage() {
    return (
      <div> 
        <Navbar currentPage={"landingpage"}/>
          <section id="welcome">
              <div className="container-fluid">
                <div className="row">
                  <div className="col text-center">
                    <h5 className="welcome-to">WELCOME TO</h5>
                    <h1 className="display-1 ugnayan-text mb-0">UGNAYAN</h1>
                    <h3 className="gateway">Your gateway to UP Org Culture</h3>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 p-0 d-flex align-items-center justify-content-center intro-img">
                  <img src="/src/assets/UP-Org-Fair-by-Jerald-Caranza.jpg" className="img-fluid" alt="Main Image"></img>
                  <div className="gradient-bg"></div>
                  <div className='intro'>
                    <a href="#intro-text">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8D021F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-down">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </section>

    <section id="intro-text">
      <div className="container-fluid">
        <div className="row">
          <div className="col text-center">
            <p className="custom-paragraph">UP Diliman is home to a vibrant and diverse ecosystem of hundreds of 
              university organizations. <span className="ugnayan-text">UGNAYAN</span>'s aim is to streamline the 
              process of discovering, learning about, applying, and engaging with them, empowering every 
              student to find their perfect match within the UP Org community.</p>
          </div>
        </div>
      </div>
    </section>
      </div>
    )
  }