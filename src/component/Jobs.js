import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function Jobs() {

    const [job, setJob] = useState([]);
    const [loader, setLoader] = useState(true);
    // let host = 'https://api.zmyn.repl.co/jobs';
    let host = 'http://localhost:4000';

    const fecthJobData = async () => {
        // const response = await fetch(host, {
        const response = await fetch(`${host}/job/getjob`, {
            method: 'GET',
        });

        const json = await response.json();
        setJob(json);
        setLoader(false);
    }

    useEffect(() => {
        fecthJobData();
    }, [])

    return (
        <>


            {loader ? <div>loading...</div> : ''}

            <section style={{ display: 'flex', justifyContent: "space-evenly", flexWrap: 'wrap', flexDirection: 'column', padding: '20px' }}>
                <div class="card" style={{ width: '100%' }}>

                    <div class="card-body">
                        <div className='d-flex'>

                            <div style={{ width: '100%', paddingRight: "8px" }}>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Profile' />
                            </div>
                            <div style={{ width: '100%' }}>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Place' />
                            </div>
                            <div class="px-2" style={{ width: '100%' }}>
                                <select class="form-select px-2" aria-label="Default select example">
                                    <option selected>Job Type</option>
                                    <option value="remote">Remote</option>
                                    <option value="onsite">Onsite</option>
                                </select>
                            </div>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Salary</option>

                                <option value="5,000-10,000">5,000-10,000</option>
                                <option value="10,000-15,000">10,000-15,000</option>
                                <option value="15,000-20,000">15,000-20,000</option>
                                <option value="20,000-30,000">20,000-30,000</option>
                                <option value="30,000-50,000">30,000-50,000</option>
                                <option value="50,000 more">50,000 more</option>
                            </select>
                        </div>
                        <div className='d-flex'>
                            <div class="m-3 px-3 form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Intership</label>
                            </div>
                            <div class="m-3 px-3 form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Job</label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-outline-primary">SEARCH</button>
                    </div>
                </div>

                {job.map((element) => {
                    return <div key={element.about_company} class="card" style={{ width: '50%', margin: '10px' }}>
                        <div class="card-header">
                            {element.jobTitle}
                        </div>
                        <div class="card-body">
                            <p class="card-text">{element.comName}</p>
                            <p class="card-text">{element.jobPlace}</p>
                            <p class="card-text">{element.salary}</p>
                            <Link to={`/jobdetails/${element._id}`} class="btn btn-outline-primary">View More</Link>
                        </div>
                    </div>

                })}

                <dir style={{textAlign:'center'}}>
                    <div  class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </dir>

            </section>

        </>
    )
}
