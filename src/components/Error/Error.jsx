/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import styles from './Error.module.scss'
import { NavLink } from 'react-router-dom'

const Error = ({ call, title, description }) => {

    const handelReload = () => {
        window.location.reload()
    }

    return (
        <>
            <section className={`${styles.error}`}>
                <img src='../../../public/images/Oppsimg.png' />
                <h4>{title}</h4>
                <p>{description}</p>



                {
                    call === "serverError" ? (
                        <>
                            <button onClick={handelReload}>Reload</button>
                        </>
                    ) : (
                        <>
                        <NavLink to='/'><button>Back to Home</button></NavLink>
                        </>
                    )
                }

            </section>
        </>
    )
}

export default Error