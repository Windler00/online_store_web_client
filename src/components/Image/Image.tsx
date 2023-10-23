import React, { useState } from 'react';
import styles from "./Image.module.css"

interface ImageProps {
    src: string;
    alt: string;
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
    const [zoomed, setZoomed] = useState(false);

    const handleClick = () => {
        setZoomed(!zoomed);
    };

    return (
        <div className={styles.Image}>
            <img
                src={src}
                alt={alt}
                onClick={handleClick}
                className={zoomed ? styles.Zoomed : styles.Normal}
            />
            {zoomed && <div className={styles.ZoomedOverlay} onClick={handleClick} />}
        </div>

    );
};

export default Image;
