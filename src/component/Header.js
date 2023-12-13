import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary sticy-top">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Jobs Portals</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/jobs">Jobs</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/jobs">My applications</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/massage">Massage</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/login">Login</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/register">Regester</Link>
                            </li>
                        </ul>


                        {!localStorage.getItem('token')  ?  <button class="btn btn-outline-success" type="submit"><Link to='/login'>login</Link></button> : 
                         <button class="btn btn-outline-success" type="submit"><Link to='/account'>Account</Link></button>}

                

                     
                    </div>
                </div>
            </nav>

        </>
    )
}
