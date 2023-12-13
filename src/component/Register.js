import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

export default function Register() {

    let host = 'http://localhost:4000';
    const navigate = useNavigate();
    const [credential, setCredential] = useState({ username: '', email: '', password: '' });
    // const clientId = '598459928179-h167auc2o9o1qg9cgnn77amapl6k8t75.apps.googleusercontent.com';



    const createUser = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: credential.username, email: credential.email, password: credential.password, usertype: 'nomaintion' })
        });
        const json = await response.json();

        if (json) {
            if (json.errors) {
                console.log('worng..');
            }else{
                navigate('/account');
                localStorage.setItem('token', json.user.id);
            }
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }


    const onSignupSuccess = async (res) => {
        const decoded = jwtDecode(res.credential);

        const response = await fetch(`${host}/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: decoded.name, email: decoded.email, password: 'googleuser', usertype: 'nomaintion' })
        });
        const json = await response.json();

        if (json) {
            if (json.errors) {
                console.log('worng..');
            }else{
                navigate('/account');
                localStorage.setItem('token', json.user.id);
            }
        }

    }

    const onSignupFailure = (res) => {
        console.log(res);
        console.log('res');
    }


    return (
        <>
            <section style={{ display: 'flex', justifyContent: 'center', margin: '20px',flexDirection:'column',alignItems:'center' }}>
                <form style={{ width: '50%' }} onSubmit={createUser}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" value={credential.email} onChange={onChange} name="email" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Username</label>
                        <input type="text" class="form-control" id="username" value={credential.username} onChange={onChange} name="username" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" value={credential.password} onChange={onChange} name="password" />
                    </div>

                    <button type="submit" class="btn btn-primary mt-4">Register</button>

                </form>

                <div>
                    <div>
                        <GoogleOAuthProvider clientId="310939962704-3i8fo0j3mouei5hljqniknafo18jfsu5.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    onSignupSuccess(credentialResponse);
                                }}
                                onError={onSignupFailure}
                            />
                        </GoogleOAuthProvider>
                    </div>
                </div>

            </section>

        </>
    )
}
