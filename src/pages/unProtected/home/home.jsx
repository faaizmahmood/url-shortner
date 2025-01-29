/* eslint-disable no-unused-vars */
import React from 'react'
import styles from './home.module.scss'
import useHome from './useHome'
import { NavLink, useLocation } from 'react-router-dom'

const Home = () => {

    const { setURL, handleSubmit, shortenedURL, copyText } = useHome()

    const location = useLocation()

    return (

        <section className={`${styles.home} py-5`}>

            <h1 className='text-center'>
                Short URL
            </h1>

            <div className={`${styles.urlbox} mt-4 text-center`}>

                <h4>Paste the URL to be shortened</h4>

                <div className='urlform'>

                    <form onSubmit={handleSubmit}>

                        <div className='mt-5'>
                            <input type='text' placeholder='Enter Your Long URL Here...' onChange={(e) => {
                                setURL(e.target.value)
                            }} />
                        </div>

                        {
                            shortenedURL ? (
                                <span className={`${styles.shortenedURL}`} onClick={() => copyText(shortenedURL)}>http://localhost:5173/u/{shortenedURL ? shortenedURL : ""} <i className="fa-regular fa-copy ms-2"></i></span>
                            ) : ""
                        }



                        <div>
                            <button type='submit' className='mt-4'>
                                Shorten URL
                            </button>
                        </div>

                    </form>

                </div>

                <p className='w-75 mx-auto mt-4'>
                    ShortURL is a free tool to shorten URLs and generate short links URL shortener allows to create a shortened link making it easy to share
                </p>

                <div className='d-flex gap-2 justify-content-center'>
                    <NavLink to='/auth/signin'><button>SignIn</button></NavLink>
                    <NavLink to='/auth/signup'><button>SignUp</button></NavLink>
                </div>

            </div>

        </section>

    )
}

export default Home