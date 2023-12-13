import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function JobDetails() {
    const { jobid } = useParams();

    const [job, setJob] = useState([]);
    let host = 'http://localhost:4000';
    const navigate = useNavigate();

    const fecthJobData = async () => {
        const response = await fetch(`${host}/job/getonejob`, {
            method: 'GET',
            headers: {
                'jobid': jobid
            }
        });
        const json = await response.json();
        setJob(json);
        console.log(json);
    }


    useEffect(() => {
        fecthJobData();
    }, [])
    return (
        <>

            <section style={{ display: 'flex', justifyContent: "space-evenly", flexWrap: 'wrap', flexDirection: 'column', padding: '20px' }}>
                <div class="card" style={{ width: '100%' }}>
                    <div class="card-body">

                        <h2>{job.jobTitle}</h2>
                        <div>{job.comName}</div>
                        <hr />
                        <p> {job.jobDescription}</p>
                        <p> {job.requirement}</p>
                        <div>{job.jobPlace}</div>
                        <div>{job.date}</div>
                        <div>{job.jobType}</div>
                        <div>{job.salary}</div>
                        <div>{job.skills}</div>
                    </div>
                </div>
            </section>
            <div className='text-center'>

                <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    APPLY NOW
                </button>


                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                ...
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">APPLY</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




















        </>
    )
}
