import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { editOrgDescription, editOrgPictures, fetchOrgData, updateAvailabilityOrg } from "../../components/FirebaseConnection";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../FirebaseConfig';

export default function EditOrgModalContent({ handleClose }) {
  const params = useParams();

  const [orgs, setOrgs] = useState({});
  const [orgPic, setOrgPic] = useState('');

  const orgLogo = orgs.orgLogo + ".jpg";
  const orgBio = orgs.orgBio;

  const handleBack = () => {
    window.history.back();
  };

  const [isUserAnOrgAdmin, setIsUserAnOrgAdmin] = useState(false);
  useEffect(() => {
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
          if (user) {
              if (auth.currentUser?.isAnonymous) {
                  setIsUserAnOrgAdmin(false);
              } else {
                  const uid = user.uid;
                  console.log(uid);

                  const db = getFirestore(app);
                  getDoc(doc(db, "users", uid)).then(docSnap => {
                      if (docSnap.exists()) {
                        setIsUserAnOrgAdmin(docSnap.data().role === "Org Admin");
                      }
                  });
              }
          } else {
            setIsUserAnOrgAdmin(false);
          }
      })
    }, [isUserAnOrgAdmin]);

  const [websiteName, setWebsiteName] = useState('');
  const [facebookName, setFacebookName] = useState('');
  const [orgDesc, setOrgDesc] = useState("");

  const [orgPicLink1, setOrgPicLink1] = useState("");
  const [orgPicLink2, setOrgPicLink2] = useState("");
  const [orgPicLink3, setOrgPicLink3] = useState("");

  const [available, setAvailable] = useState(true);
  
  function setCheckAvailable(id) {
    if (available) {
      setAvailable(false);
      updateAvailabilityOrg(id, false)
    } else {
      setAvailable(true);
      updateAvailabilityOrg(id, true)
    }
  }

  useEffect(() => {
      if (orgs && orgs.orgWebsite) {
          const urlParts = orgs.orgWebsite.split('/');
          const name = urlParts[urlParts.length - 2];
          setWebsiteName(name);
      }
  }, [orgs]);

  useEffect(() => {
      if (orgs && orgs.orgFacebook) {
          const urlParts = orgs.orgFacebook.split('/');
          const name = urlParts[urlParts.length - 2];
          setFacebookName(name);
      }
  }, [orgs]);

  useEffect(() => {
    if (orgs && orgs.orgDescription) {
        setOrgDesc(orgs.orgDescription);
    }
}, [orgs]);

  useEffect(() => {
    if (orgs && orgs.orgPictures) {
        if (orgs.orgPictures.length > 0) setOrgPicLink1(orgs.orgPictures[0]);
        if (orgs.orgPictures.length > 1) setOrgPicLink2(orgs.orgPictures[1]);
        if (orgs.orgPictures.length > 2) setOrgPicLink3(orgs.orgPictures[2]);
    }
  }, [orgs]);

  function handleChangeDesc() {
    editOrgDescription(orgs.id, orgDesc);
  }

  function handleChangePics() {
    editOrgPictures(orgs.id, orgPicLink1, orgPicLink2, orgPicLink3);
  }

  useEffect(() => {
    setOrgs({}); // Clear existing data before fetching new data
    fetchOrgData()
      .then(data => {
        const newData = data.map(item => ({ ...item, starred: false }));
        
        // Find the organization with the same ID as params
        const orgWithParamsId = newData.find(org => org.orgId === params.orgId);
  
        // Update state with the organization matching the ID
        if (orgWithParamsId) {
          setOrgs(orgWithParamsId);
          if (orgWithParamsId.orgPictures && orgWithParamsId.orgPictures.length > 0) {
            setOrgPic(orgWithParamsId.orgPictures[0]);
          }
        } else {
          console.log("Organization not found with the given ID");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [params.orgId]); // Dependency array including params.orgId to re-run the effect when params.orgId changes

  return (
    <div>
      <>
        <div className="container-md">

        <div id="myCarousel" className="carousel slide mb-6 rounded-3" data-bs-ride="carousel">
          <div className="carousel-inner carousel-edit rounded-3">
            <div className="carousel-item carousel-item-edit active">
              <div className="carousel-image rounded-3" style={{ 
                backgroundImage: orgPic ? `url(\"${orgPic}` + '.jpg\")' : '',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%'
              }}> </div>
            </div>
            <div className="carousel-item">
              <svg className="bd-placeholder-img rounded-3" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></svg>
            </div>
            <div className="carousel-item">
              <svg className="bd-placeholder-img rounded-3" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></svg>
            </div>
          </div>
        </div> 

        <div className="org-header-box">
          <div className="row">
            <div className="col-md-auto"><img src={orgLogo} className="edit-logo-img" alt="..."/></div>
            <div className="col-8 org-header-text">
              <h4 className="font-inter custom-grey">{orgs.orgName}</h4>
            </div>
          </div>
        </div>

          <h5> Application Status </h5>
          <div className="col-md px-4">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={available} onClick={() => setCheckAvailable(orgs.id)} />
              <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Applications are Open</label>
            </div>
          </div>

          <h5 className='mt-4'> About </h5>
          <div className="col-md px-4">
            <div className="form-floating mb-2 mt-3">
              <input type="date" className="form-control" id="floatingDateFounded" placeholder="Month XX, XXXX" value={orgs.dateFounded} />
              <label htmlFor="floatingDateFounded"> Date Founded </label>
            </div>
            <div className="form-floating mb-2">
              <input type="text" className="form-control" id="floatingLocation" placeholder="UP Diliman" value={orgs.orgLocation} />
              <label htmlFor="floatingLocation"> Org Location </label>
            </div>
            <div className="form-floating mb-2">
              <input type="email" className="form-control" id="floatingEmail" placeholder="email@example.com" value={orgs.orgEmails} />
              <label htmlFor="floatingEmail"> Org Email </label>
            </div>
            <div className="form-floating mb-2">
              <input type="url" className="form-control" id="floatingWebsite" placeholder="https://example.com" value={orgs.orgWebsite} />
              <label htmlFor="floatingWebsite"> Org Website </label>
            </div>
            <div className="form-floating mb-2">
              <input type="url" className="form-control" id="floatingFB" placeholder="https://example.com" value={orgs.orgFacebook} />
              <label htmlFor="floatingFB"> Facebook Page </label>
            </div>
            <div className="form-floating mb-4">
              <input type="text" className="form-control" id="floatingAffiliations" placeholder="https://example.com" value={orgs.orgAffiliations} />
              <label htmlFor="floatingAffiliations"> Affiliations </label>
            </div>
          </div>

          <h5 className='mt-4'> Description </h5>
          <div className="col-md px-4">
          <div className="form-group">
            <textarea className="form-control" 
              placeholder="Describe your organization here!" 
              id="floatingTextarea2" style={{ height: 300 }} 
              value={orgDesc}
              onChange={e => setOrgDesc(e.target.value)}></textarea>
          </div>
          </div>

          <h5 className='mt-4'> Short Bio </h5>
          <div className="col-md px-4">
          <div className="form-group">
            <textarea className="form-control" 
              placeholder="Describe your organization here!" 
              id="floatingTextarea2" style={{ height: 100 }} 
              value={orgBio}
              onChange={e => setOrgDesc(e.target.value)}></textarea>
          </div>
          </div>

      </div>
      </>
    </div>
  );
}