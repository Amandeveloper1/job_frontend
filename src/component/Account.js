import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const [user, setUser] = useState([]);
  const [allDetails, setAllDetails] = useState([]);
  let host = 'http://localhost:4000';
  const navigate = useNavigate();
  const [credential, setCredential] = useState({ username: '', udesc: '', uskill: '', jobfor: '' });


  const fecthUserData = async () => {
    const response = await fetch(`${host}/auth/getuser`, {
      method: 'GET',
      headers: {
        'userid': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    if (json) {
      setUser(json);
      const response2 = await fetch(`${host}/userd/getudetails`, {
        method: 'GET',
        headers: {
          'userId': json._id
        }
      });
      const json2 = await response2.json();
      if (json2) {
        if (json2.errors) {
          console.log("not udetails");
        } else {
          setAllDetails(json2);
        }
      }

    }
  }


  const logout = () => {
    localStorage.clear();
    navigate('/');
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fecthUserData();
    } else {
      navigate('/');
    }
  }, [])



  const uDetailsSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/userd/udetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: user._id, username: credential.username, uDesc: credential.udesc, skills: credential.uskill, ustatus: credential.jobfor })
    });
    const json = await response.json();

    if (json) {
      setAllDetails(json);
      document.getElementById('udetailclose').click();
    }
  }







  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }
  const darkmode = (e) => {
    if (e.target.checked) {
      document.querySelector("body").setAttribute("data-bs-theme", "light");
    } else {
      document.querySelector("body").setAttribute("data-bs-theme", "dark");
    }
  }









  return (
    <>

      {allDetails.length !== 0 ? <>

        <section style={{ display: 'flex', justifyContent: "space-evenly", flexWrap: 'wrap', flexDirection: 'column', padding: '20px' }}>
          <div class="card" style={{ width: '100%' }}>
            <div class="card-body">

              <h2>{allDetails.username}</h2>
              <div>{allDetails.ustatus}</div>
              <hr />
              <p> {allDetails.userDescription}</p>
              <hr />
              <div>Skills</div>
              <div>{allDetails.skills}</div>
              <hr />
              <br />
              <br />
              <br />

              <div className='mt-4'>
                <button class="btn btn-outline-success" onClick={logout}>Logout</button>
              </div>

            </div>
          </div>
        </section>


        <section className='mt-4'> workinng <Link to="/createjob" >job post</Link>     </section>



      </> :



        <section>
          <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Set Up Account
          </button>
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">SetUp Account Details</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form onSubmit={uDetailsSubmit}>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Your Name</label>
                      <input type="text" class="form-control" id="username" value={credential.username} onChange={onChange} name="username" />
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">Description</label>
                      <textarea class="form-control" id="udesc" value={credential.udesc} onChange={onChange} name="udesc" style={{ height: '150px' }}></textarea>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">Skills</label>
                      <input type="text" class="form-control" id="uskill" value={credential.uskill} onChange={onChange} name="uskill" />
                    </div>
                    <select class="form-select" aria-label="Default select example" id="jobfor" value={credential.jobfor} onChange={onChange} name="jobfor">
                      <option selected>I'm a Employer/employee</option>
                      <option value="Employer">Employer</option>
                      <option value="Employee">Employee</option>
                    </select>
                    <div class="modal-footer">
                      <button id='udetailclose' type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </section>

      }


















      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" onChange={darkmode} id="flexSwitchCheckChecked" />
        <label class="form-check-label" for="flexSwitchCheckChecked" >Light Mode</label>
      </div>



      <br />
      <br />
      <br />
      <br />
      <br />
      <br />





    </>
  )
}
