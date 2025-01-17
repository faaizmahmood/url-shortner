/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import styles from './Model.module.scss'
import Barcode from 'react-barcode'
import {QRCodeCanvas} from 'qrcode.react';

const Model = ({ data, onClose }) => {
    return (
        <section className={`${styles.model}`}>
            <div className={styles.modalContent}>
                <h3>URL Details</h3>
                <p><strong>Short URL:</strong> http://localhost:5173/u/{data?.shortURL}</p>
                <p><strong>Long URL:</strong> {data?.longURL}</p>

                <h4>QRCode</h4>
                <QRCodeCanvas value={`http://localhost:5173/u/${data?.shortURL}`} size={200}  />

               <div>
               <button onClick={onClose} className={styles.closeButton}>
                    Close
                </button>
               </div>
            </div>
        </section>
    )
}

export default Model