import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from 'next/link';
import { Layout } from '../../components/Layout';
import getAuthSession from '../../lib/session';
import { useState } from 'react';
import useUser from '../../lib/useUser';
import fetchJson from '../../lib/fetchJson';
import { FetchError } from '../../lib/fetchJson';


export default Login;

function Login() {
    const router = useRouter();
    // form validation rules 
    // var [errorMsg, setErrorMsg] = useState()
    const { mutate } = useUser({
        redirectTo: '/contact/list',
        redirectIfFound: true,    
    })
    
    var validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const onSubmit = async(data, e) => {
        // display form data on success
        // if(data.email && data.password && data.email === 'admin@gmail.com' && data.password === 'adminn') {
        //     router.push({
        //         pathname: '/account/login'
        //     });
        // }
        // else {
        //     setAccount('userService.userValue');
            
        // }
        e.preventDefault()
        const body = {
            email: data.email,
            password: data.password
        }
        try {
            mutate(
                await fetchJson('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify(body)
                }) 
                )
            console.log('line 60 OK')
            
        } catch (error) {
            if(error instanceof FetchError) {
                // setErrorMsg(error.data.message)
            } else {
                console.log('An unexpected error happened: ' , error)
            }
        }
        return ''

    }

  return (
    <>
        <Head>
            <title>Login page</title>
        </Head>
        <Layout>
            <div className="card">
                <h4 className="card-header">Login</h4>
                <div className="card-body">
                <form onSubmit={async function handleSubmit(event) {
                    event.preventDefault()
                    const body = {
                    email: event.currentTarget.email.value,
                    password: event.currentTarget.password.value,
                    }
                    try {
                        mutate(
                        await fetchJson('/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(body),
                        })
                        )
                        console.log('đã')
                    } catch (error) {
                        if (error instanceof FetchError) {
                            setErrorMsg(error.data.message)
                        } else {
                            console.error('An unexpected error happened:', error)
                        }
                    }
                }}>
                    <div className="form-group">
                        <label>Email</label>
                        <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                    <div className="form-group">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        {...register("password")}
                        className={`form-control ${
                        errors.password ? "is-invalid" : ""
                        }`}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <button
                    disabled={formState.isSubmitting}
                    className="btn btn-primary"
                    >
                    {formState.isSubmitting && (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Login
                    </button>
                    <Link href="/account/register" className="btn btn-link">
                    Register
                    </Link>
                </form>
                {/* {errorMsg && <p className="error">{errorMsg}</p>} */}

                </div>
            </div>
        </Layout>
    </>
  );
}