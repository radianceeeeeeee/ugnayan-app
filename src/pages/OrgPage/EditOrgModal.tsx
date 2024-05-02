import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { editOrgDescription, editOrgBio, editOrgAbout, editOrgTags, editOrgPictures, fetchOrgData, updateAvailabilityOrg } from "../../components/FirebaseConnection";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../FirebaseConfig';
import TagsInput from '../../components/TagsInput/TagsInput';
import toast, { Toaster } from 'react-hot-toast';

export default function EditOrgModalContent({ handleClose }) {
  const params = useParams();

  const [orgs, setOrgs] = useState({});
  const [orgPic, setOrgPic] = useState('');
  const [updatedTags, setUpdatedTags] = useState([]);

  const orgLogo = orgs.orgLogo + ".jpg";

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

  const [orgDesc, setOrgDesc] = useState("");
  const [orgBio, setOrgBio] = useState("");

  const [orgPicLink1, setOrgPicLink1] = useState("");
  const [orgPicLink2, setOrgPicLink2] = useState("");
  const [orgPicLink3, setOrgPicLink3] = useState("");

  const [available, setAvailable] = useState(true);

  const selectedTags = tags => {
    console.log(tags);
    };
  
  function setCheckAvailable(id) {
    if (available) {
      setAvailable(false);
      updateAvailabilityOrg(id, false)
    } else {
      setAvailable(true);
      updateAvailabilityOrg(id, true)
    }
    toast.success('Application details have been updated.')
  }

  useEffect(() => {
    if (orgs && orgs.orgDescription) {
        setOrgDesc(orgs.orgDescription);
    }
  }, [orgs]);

  useEffect(() => {
    if (orgs && orgs.orgBio) {
        setOrgBio(orgs.orgBio);
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
    toast.success('Org description has been updated.');
  }

  function handleChangeBio() {
    editOrgBio(orgs.id, orgBio);
    toast.success('Short bio has been updated.')
  }

  function handleChangeAbout() {
    editOrgAbout(orgs.id, orgs.dateFounded, orgs.orgLocation, orgs.orgEmails, orgs.orgWebsite, orgs.orgFacebook, orgs.orgAffiliations);
    toast.success('About info has been updated.')
  }

  function handleChangeTags(tags) {
    setUpdatedTags(tags);
  }

  function handleSaveTags() {
    editOrgTags(orgs.id, updatedTags);
    toast.success('Org tags have been updated.');
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
    <div className="container-md">
      <Toaster
        toastOptions={{
          success: {
            style: {
              border: '1px solid #005538',
              color: '#005538',
            },
            iconTheme: {
              primary: '#005538',
              secondary: '#FFFAEE',
            },
          },
        }}
      />

        <div id="myCarousel" className="carousel slide mb-6 rounded-3 position-relative" data-bs-ride="carousel">
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
          </div>
          
          <button type="button" className="btn img-edit-button position-absolute top-50 start-50 translate-middle" data-bs-toggle="modal" data-bs-target="#bannerModal"> Edit Banner Images </button>
            <div className="modal fade" id="bannerModal" tabIndex="-1" aria-labelledby="bannerModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel"> Edit Banner Images </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="form-floating mb-2 mt-2">
                      <input type="url" className="form-control" id="floatingBanner1" placeholder="https://example.com" value={orgPicLink1} onChange={e => setOrgPicLink1(e.target.value)} />
                      <label htmlFor="floatingBanner1"> Imgur Link 1 </label>
                    </div>
                    <div className="form-floating mb-2">
                      <input type="url" className="form-control" id="floatingBanner2" placeholder="https://example.com" value={orgPicLink2} onChange={e => setOrgPicLink2(e.target.value)}/>
                      <label htmlFor="floatingBanner2"> Imgur Link 2 </label>
                    </div>
                    <div className="form-floating mb-2">
                      <input type="url" className="form-control" id="floatingBanner3" placeholder="https://example.com" value={orgPicLink3} onChange={e => setOrgPicLink3(e.target.value)}/>
                      <label htmlFor="floatingBanner3"> Imgur Link 3 </label>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-dark org-options-button"> Close </button>
                    <button type="button" className="btn btn-outline-dark org-options-button" onClick={handleChangePics}> Save Changes </button>
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div className="org-header-box">
          <div className="row">
            <div className="col-md-auto"><img src={orgLogo} className="edit-logo-img" alt="..."/></div>
            <div className="col-8 org-header-text">
              <h4 className="font-inter custom-grey">{orgs.orgName} ({orgs.orgAcronym})</h4>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center" style={{ marginTop: "-45px" }}>
          <h5 className='mt-4'> Tags </h5>
          <span className="save-changes-text" style={{ cursor: 'pointer', color: '#005538', textDecoration: 'underline', marginTop: '20px' }}
          onClick={handleSaveTags}> Save Changes </span>
        </div>
        <div className="col-md px-4">
        <TagsInput onChange={handleChangeTags}  tags={orgs.orgTags}/>
        </div>

        <h5 className='mt-4'> Application Details </h5>
        <div className="col-md px-4">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={available} onClick={() => setCheckAvailable(orgs.id)} />
            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Applications are Open</label>
          </div>
        </div>
        
        <div className="d-flex justify-content-between align-items-center">
          <h5 className='mt-4'> About </h5>
          <span className="save-changes-text" style={{ cursor: 'pointer', color: '#005538', textDecoration: 'underline', marginTop: '20px' }}
          onClick={handleChangeAbout}> Save Changes </span>
        </div>
        <div className="col-md px-4">
          <div className="form-floating mb-2 mt-3">
            <input type="date" className="form-control" id="floatingDateFounded" value={orgs.dateFounded} onChange={(e) => setOrgs({ ...orgs, dateFounded: e.target.value })} />
            <label htmlFor="floatingDateFounded"> Date Founded </label>
          </div>
          <div className="form-floating mb-2">
            <input type="text" className="form-control" id="floatingLocation" placeholder="UP Diliman" value={orgs.orgLocation} onChange={(e) => setOrgs({ ...orgs, orgLocation: e.target.value })} />
            <label htmlFor="floatingLocation"> Org Location </label>
          </div>
          <div className="form-floating mb-2">
            <input type="email" className="form-control" id="floatingEmail" placeholder="email@example.com" value={orgs.orgEmails} onChange={(e) => setOrgs({ ...orgs, orgEmails: e.target.value })} />
            <label htmlFor="floatingEmail"> Org Email </label>
          </div>
          <div className="form-floating mb-2">
            <input type="url" className="form-control" id="floatingWebsite" placeholder="https://example.com" value={orgs.orgWebsite} onChange={(e) => setOrgs({ ...orgs, orgWebsite: e.target.value })} />
            <label htmlFor="floatingWebsite"> Org Website </label>
          </div>
          <div className="form-floating mb-2">
            <input type="url" className="form-control" id="floatingFB" placeholder="https://example.com" value={orgs.orgFacebook} onChange={(e) => setOrgs({ ...orgs, orgFacebook: e.target.value })} />
            <label htmlFor="floatingFB"> Facebook Page </label>
          </div>
          <div className="form-floating mb-4">
            <input type="text" className="form-control" id="floatingAffiliations" placeholder="https://example.com" value={orgs.orgAffiliations} onChange={(e) => setOrgs({ ...orgs, orgAffiliations: e.target.value })} />
            <label htmlFor="floatingAffiliations"> Affiliations </label>
          </div>
        </div>


        <div className="d-flex justify-content-between align-items-center">
          <h5 className='mt-4'> Description </h5>
          <span className="save-changes-text" style={{ cursor: 'pointer', color: '#005538', textDecoration: 'underline', marginTop: '20px' }}
          onClick={handleChangeDesc}> Save Changes </span>
        </div>
        <div className="col-md px-4">
        <div className="form-group">
          <textarea className="form-control" 
            placeholder="Describe your organization here!" 
            id="floatingTextarea2" style={{ height: 300 }} 
            value={orgDesc}
            onChange={e => setOrgDesc(e.target.value)}></textarea>
        </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <h5 className='mt-4'> Short Bio </h5>
          <span className="save-changes-text" style={{ cursor: 'pointer', color: '#005538', textDecoration: 'underline', marginTop: '20px' }}
          onClick={handleChangeBio}> Save Changes </span>
        </div>
        <div className="col-md px-4">
        <div className="form-group">
          <textarea className="form-control" 
            placeholder="Describe your organization here!" 
            id="floatingTextarea2" style={{ height: 100 }} 
            value={orgBio}
            onChange={e => setOrgBio(e.target.value)}></textarea>
        </div>
        </div>

    </div>
  );
}