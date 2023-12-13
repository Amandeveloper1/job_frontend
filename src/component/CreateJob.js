import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function CreateJob() {

    let host = 'http://localhost:4000';
    const navigate = useNavigate();
    const [credential, setCredential] = useState({ jobtitle: '',requirement:'',jobfor:'', compname: '',desc:'',salary:'',location:'',jobtype:'',skills:'' });


    const jobSubmit = async (e) => {
        e.preventDefault();
       
        const response = await fetch(`${host}/job/createjob`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jobTitle: credential.jobtitle,jobfor:credential.jobfor, jobDescription: credential.desc, comName:credential.compname ,salary:credential.salary,skills:credential.skills,requirement:credential.requirement ,jobType:credential.jobtype ,jobPlace:credential.location })
        });
        const json = await response.json();

        if (json) {
            navigate('/jobs');
            console.log(credential);
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }


    return (
        <>
            <section style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                <form style={{ width: '50%' }} onSubmit={jobSubmit}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Job Title</label>
                        <input type="text" class="form-control" id="jobtitle" value={credential.jobtitle} onChange={onChange} name="jobtitle"   />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Company Name</label>
                        <input type="text" class="form-control" id="compname" value={credential.compname} onChange={onChange} name="compname" />
                    </div>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="desc" value={credential.desc} onChange={onChange} name="desc" style={{ height: '200px' }}></textarea>
                        <label for="floatingTextarea2">Description</label>
                    </div>
                  

                    <label for="exampleInputPassword1" class="form-label mt-3">Salary</label>
                    <select class="form-select mb-3" aria-label="Default select example"  id="salary" value={credential.salary} onChange={onChange} name="salary"  >
                        <option selected>Amount</option>
                        <option value="5,000-10,000">5,000-10,000</option>
                        <option value="10,000-15,000">10,000-15,000</option>
                        <option value="15,000-20,000">15,000-20,000</option>
                        <option value="20,000-30,000">20,000-30,000</option>
                        <option value="30,000-50,000">30,000-50,000</option>
                        <option value="50,000 more">50,000 more</option>
                    </select>
                    <div class="form-floating mb-3">
                        <textarea class="form-control" placeholder="Leave a comment here" id="requirement" value={credential.requirement} onChange={onChange} name="requirement" style={{ height: '150px' }}></textarea>
                        <label for="floatingTextarea2">Requirement</label>
                    </div>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="skills" value={credential.skills} onChange={onChange} name="skills" style={{ height: '100px' }}></textarea>
                        <label for="floatingTextarea2">Skills</label>
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Location</label>
                        <input type="text" class="form-control" id="location" value={credential.location} onChange={onChange} name="location" />
                    </div>
                    <select class="form-select" aria-label="Default select example"  id="jobtype" value={credential.jobtype} onChange={onChange} name="jobtype">
                        <option selected>Job type remote/onsite</option>
                        <option value="remote">remote</option>
                        <option value="onsite">onsite</option>
                    </select>
                    <select class="form-select mt-3" aria-label="Default select example"  id="jobfor" value={credential.jobfor} onChange={onChange} name="jobfor">
                        <option selected>Hire for Intership/Job</option>
                        <option value="Intership">Intership</option>
                        <option value="Job">Job</option>
                    </select>

                    <button type="submit" class="btn btn-primary mt-4">Submit</button>
                </form>
            </section>


        </>
    )
}
