/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './editURLModel.module.scss'
import useEditURLModel from './useEditURLModel';

const EditURLModel = ({ data, onClose }) => {

    const { formik } = useEditURLModel(data, onClose)

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <section className={`${styles.EditURLModel}`}>


                    <div className={`${styles.input_group}`}>
                        <label>Short URL</label>
                        <input type='text' name='shortURL' value={formik.values.shortURL} onChange={formik.handleChange} placeholder='Short URL' />
                        {
                            formik.errors.shortURL && formik.touched.shortURL && (
                                <div className="error">{formik.errors.shortURL}</div>
                            )
                        }
                    </div>

                    <div className={`${styles.input_group}`}>
                        <label>Destination URL</label>
                        <input type='text' name='longURL' value={formik.values.longURL} onChange={formik.handleChange} placeholder='Destination URL' />
                        {
                            formik.errors.longURL && formik.touched.longURL && (
                                <div className="error">{formik.errors.longURL}</div>
                            )
                        }
                    </div>

                    <div className={`${styles.input_group}`}>
                        <label>Description</label>
                        <textarea rows={5} name='description' value={formik.values.description} onChange={formik.handleChange} placeholder='Description' />
                    </div>

                    <div className={`${styles.btn_group}`}>
                        <button type='submit'>Update</button>
                        <button onClick={onClose}>Close</button>
                    </div>
                </section>

            </form>
        </>
    )
}

export default EditURLModel