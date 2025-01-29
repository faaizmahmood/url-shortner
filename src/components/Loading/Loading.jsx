/* eslint-disable no-unused-vars */
// Loading.js
import React from 'react';
import styles from './Loading.module.scss'
// import ScaleLoader from 'react-spinners'

const Loading = () => {
    return (
        <div className={`${styles.loading}`}>
            <h4>
                URL Shortner
            </h4>
            <p>
                Loading
            </p>
            {/* <ScaleLoader color="#0000ff" /> */}
        </div>
    );
};

export default Loading;
