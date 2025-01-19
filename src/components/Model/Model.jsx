/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import styles from './Model.module.scss'
import Barcode from 'react-barcode'
import { QRCodeCanvas } from 'qrcode.react';
import { toast } from 'react-toastify';

const Model = ({ data, onClose }) => {

    const qrRef = useRef()

    const handelDownload = () => {

        const canvas = qrRef.current.querySelector('canvas');
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `${data?.shortURL}_QRCode.png`;
        link.click()

    }

    const handelCopy = async () => {

        const canvas = qrRef.current.querySelector('canvas');
        const dataURL = canvas.toDataURL('image/png');

        try {

            await navigator.clipboard.writeText(dataURL)
            toast.success("QRCode Copied!")

        } catch (error) {
            console.error('Failed to copy QR Code: ', error);
            toast.error('Failed to copy QR Code');
        }

    }

    return (
        <section className={`${styles.model}`}>
            <div className={styles.modalContent}>
                <h3 className='mb-3'>URL Details</h3>
                <p><strong>Short URL:</strong> http://localhost:5173/u/{data?.shortURL}</p>
                <p><strong>Long URL:</strong> {data?.longURL}</p>

                <h4 className='mb-4'>QRCode</h4>
                <div className={`${styles.qrcodeSec}`}>
                    <div className={`${styles.qrcode}`} ref={qrRef}>
                        <QRCodeCanvas value={`http://localhost:5173/u/${data?.shortURL}`} size={200} />
                    </div>
                    <div className={`${styles.qrcodeActionbtns}`}>
                        <div><button onClick={handelDownload}><i className="fa-regular fa-cloud-arrow-down me-2"></i> Download</button></div>
                        <div className='mt-3' onClick={handelCopy}><button><i className="fa-regular fa-copy me-2"></i> Copy QRCode</button></div>
                    </div>
                </div>


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