/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import styles from './deleteModel.module.scss'
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../store/slices/userSlice';

const DeleteModel = ({ data, onClose }) => {


    const token = Cookies.get('authToken')

    const dispatch = useDispatch()

    const handelDelete = async () => {

        try {

            const response = await axios.delete(`https://url-shortner-server-f091f5331ce0.herokuapp.com/api/url/url-delete/${data?.shortURL}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )


            if (response.status === 200) {

                toast.success('URL deleted successfully.');
                onClose()
                console.log(response.data);
                dispatch(fetchUserProfile())
            } else {
                toast.error("Error while Deleting");
            }


        } catch (error) {
            console.log(error);
            toast.error("Error while updating URL.");
        }

    }

    return (
        <>
            <section className={`${styles.DeleteModel} text-center`}>

                <h3>Are you sure? {data?.shortURL}</h3>

                <p className='mt-3'>You will not be able to recover this link!</p>

                <div className={`${styles.btn_group}`}>
                    <button onClick={handelDelete}>Yes, Delete It!</button>
                    <button onClick={onClose}>Cancel</button>
                </div>

            </section>
        </>
    )
}

export default DeleteModel