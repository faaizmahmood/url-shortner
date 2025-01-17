/* eslint-disable no-unused-vars */
import React from 'react'
import styles from './header.module.scss'
import { useSelector } from 'react-redux'

const Header = () => {

  const { profile } = useSelector((state) => state.user)
  // const { profile } = useSelector((state) => state.user);

  return (
    <>
      <header className={`${styles.header}`}>

        <div className='container'>
          <div className='row align-items-center'>

            <div className='col-4'>
              <h4>URL Shortener</h4>
            </div>
            <div className='col-4'>
              <nav>
                <ul>
                  <a href='#'><li>Dashboard</li></a>
                  <a href='#'><li>About</li></a>
                  <a href='#'><li>Contact</li></a>
                </ul>
              </nav>
            </div>
            <div className='col-4 text-end d-flex align-items-center justify-content-end'>
              <h5 style={{ textTransform: 'capitalize' }}>{profile?.user?.name} <i className="fa-sharp fa-solid fa-caret-down"></i></h5>
            </div>

          </div>
        </div>

      </header>
    </>
  )
}

export default Header