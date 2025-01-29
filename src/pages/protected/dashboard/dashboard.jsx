/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styles from './dashboard.module.scss';
import useDashboard from './useDashboard';
import MetaTags from '../../../components/MetaTags';
import { useSelector, useDispatch } from 'react-redux';
import Model from '../../../components/Model/Model';
import EditURLModel from '../../../components/editURLModel/editURLModel';
import DeleteModel from '../../../components/deleteModel/deleteModel';
import Analytics from '../../../components/analytics/analytics';
import noImg from '../../../../public/images/emptyBox.png'


const Dashboard = () => {

    const { handelLogout,
        handleSubmit,
        setURL,
        shortenedURL,
        copyText,
        handleClose,
        handleOpen,
        selectedURLData,
        open,
        getdate,
        formatNumber,
        toggleDropdown,
        openActionMenu,
        openEditURLModel,
        handelOpenEditURLModel,
        handleCloseEditURLModel,
        handleSearchChange,
        profile,
        filteredURLs,
        openDeleteModel,
        handelOpeneDeleteModel,
        handelCloseDeleteModel,
        openAnalyticsModel,
        handelOpeneAnalyticsModel,
        handelCloseAnalyticsModel
    } = useDashboard();

    // Accessing profile from Redux stor


    return (
        <>
            {/* Meta Tags */}
            <MetaTags
                title="Home - URL Shortener App"
                description="Welcome to our URL Shortener App. Shorten your long URLs and share them with ease."
                url="https://yourwebsite.com/home"
                image="https://yourwebsite.com/images/home-og-image.jpg"
            />
            {/* Meta Tags */}

            <section className={`${styles.dashboard} mt-5 pt-5`}>
                <div className="container">
                    <div className="row">
                        <div className="col-9">
                            <form onSubmit={handleSubmit}>
                                <div className={`${styles.url_shortner}`}>
                                    <input
                                        type="text"
                                        placeholder="Enter Your Long URL Here..."
                                        onChange={(e) => setURL(e.target.value)}
                                    />
                                    <button type="submit">
                                        Shorten <i className="fa-sharp fa-regular fa-arrow-right"></i>
                                    </button>
                                </div>

                                {/* {shortenedURL && (
                                    <span
                                        className={`${styles.shortenedURL}`}
                                        onClick={() => copyText(shortenedURL)}
                                    >
                                        http://localhost:5173/u/{shortenedURL} <i className="fa-regular fa-copy ms-2"></i>
                                    </span>
                                )} */}
                            </form>

                            <hr />

                            <div className={`${styles.user_urls}`}>

                                {
                                    filteredURLs && filteredURLs.length > 0 ? (
                                        <>
                                            {
                                                filteredURLs?.map((ele, ind) => {
                                                    return (
                                                        <>
                                                            <div key={ind} className={`${styles.url_item} mt-3`} >
                                                                <div className='row'>

                                                                    <div className='col-8'>
                                                                        <div className='d-flex align-items-center'>
                                                                            <i className={`fa-solid fa-qrcode ${styles.qrcodeIcon}`} style={{ cursor: 'pointer' }} onClick={() => handleOpen(ele)}></i>
                                                                            <h6 className='ms-3' style={{ width: 'fit-content' }} onClick={() => copyText(`${ele?.shortURL}`)}>http://localhost:5173/u/{ele?.shortURL} <i className="fa-regular fa-copy ms-2"></i></h6>
                                                                        </div>
                                                                        <div className='mt-2'>
                                                                            <a href={ele?.longURL} target='_blank'>{ele?.longURL.slice(0, 60)}</a>
                                                                        </div>
                                                                    </div>

                                                                    <div className='col-4 d-flex justify-content-between align-items-center'>
                                                                        <span><span style={{ color: 'blue' }} className='me-1'>{formatNumber(ele?.clicks ? ele?.clicks / 2 : 0)}</span> <i className="fa-regular fa-chart-simple"></i></span>
                                                                        <div>
                                                                            <h5>{profile?.user?.name}</h5>
                                                                            <h5 className='mt-1'>{getdate(ele?.createdAt)}</h5>
                                                                        </div>
                                                                        <div>
                                                                            <div className={`${styles.urlSetting}`} onClick={() => toggleDropdown(ind)}>

                                                                                <i className="fa-duotone fa-solid fa-gear"></i>
                                                                                {
                                                                                    openActionMenu === ind && (
                                                                                        <div className={`${styles.actionMenu}`}>
                                                                                            <ul>
                                                                                                <li onClick={() => copyText(`${ele?.shortURL}`)}> <i className="fa-regular fa-copy me-2"></i>Copy URL</li>
                                                                                                <li onClick={() => handelOpenEditURLModel(ele)}> <i className="fa-regular fa-pen-to-square me-2"></i>Edit URL</li>
                                                                                                <li onClick={() => handleOpen(ele)}> <i className="fa-regular fa-qrcode me-2"></i>View QRCode</li>
                                                                                                <li onClick={() => handelOpeneDeleteModel(ele)}><i className="fa-regular fa-trash me-2"></i> Delete URL</li>
                                                                                                <li onClick={() => handelOpeneAnalyticsModel(ele)}><i className="fa-regular fa-chart-simple me-2"></i> View Analytics</li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    )
                                                                                }

                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                        </>
                                                    )
                                                })
                                            }
                                        </>
                                    ) : (
                                        <>
                                            <div className='text-center'>
                                            <h4 className='mt-5'>No URL is Shortend Yet!</h4>
                                                <img src={noImg} />
                                            </div>
                                        </>
                                    )
                                }

                            </div>


                        </div>
                        <div className="col-3">
                            <div className={`${styles.search_bar}`}>
                                <input
                                    type="text"
                                    placeholder="Search URLs..."
                                    onChange={handleSearchChange} // Dynamically update search term
                                />

                                <button type="submit">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Model */}
            {open && <Model data={selectedURLData} onClose={handleClose} />}

            {/* Edit URL Model */}
            {openEditURLModel && <EditURLModel data={selectedURLData} onClose={handleCloseEditURLModel} />}

            {/* Delete Model */}
            {openDeleteModel && <DeleteModel data={selectedURLData} onClose={handelCloseDeleteModel} />}

            {/* Analytics */}
            {openAnalyticsModel && <Analytics data={selectedURLData} onClose={handelCloseAnalyticsModel} />}


        </>
    );
};

export default Dashboard;
