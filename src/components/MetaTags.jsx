/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Helmet } from 'react-helmet';

const MetaTags = ({ title, description, url, image }) => {
    return (
        <Helmet>
            {/* Page Title */}
            <title>{title || "Default Page Title - URL Shortener App"}</title>

            {/* Meta Description */}
            <meta
                name="description"
                content={
                    description ||
                    "Shorten your long URLs instantly with our fast and easy-to-use URL shortener app. Share your links effortlessly and track their performance."
                }
            />

            {/* Keywords */}
            <meta
                name="keywords"
                content="URL shortener, link shortener, free URL shortener, short URL, shorten links, custom URL shortener, URL tracker"
            />

            {/* Author */}
            <meta name="author" content="Your Name or Company Name" />

            {/* Viewport */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            {/* Open Graph Meta Tags for Social Media */}
            <meta property="og:title" content={title || "URL Shortener App"} />
            <meta
                property="og:description"
                content={
                    description ||
                    "Shorten your long URLs instantly with our fast and easy-to-use URL shortener app."
                }
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || "https://yourwebsite.com"} />
            <meta
                property="og:image"
                content={image || "https://yourwebsite.com/images/og-image.jpg"}
            />

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || "URL Shortener App"} />
            <meta
                name="twitter:description"
                content={
                    description ||
                    "Create short URLs effortlessly and track their performance. Free and reliable URL shortening service."
                }
            />
            <meta
                name="twitter:image"
                content={image || "https://yourwebsite.com/images/twitter-image.jpg"}
            />
            <meta name="twitter:site" content="@YourTwitterHandle" />

            {/* Favicon */}
            <link rel="icon" href="https://yourwebsite.com/favicon.ico" type="image/x-icon" />

            {/* Canonical URL */}
            <link rel="canonical" href={url || "https://yourwebsite.com"} />
        </Helmet>
    );
};

export default MetaTags;
