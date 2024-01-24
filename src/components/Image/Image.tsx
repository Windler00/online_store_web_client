import React from 'react';
import styles from "./Image.module.css"

interface ImageProps {
    src: string;
    alt: string;
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
    return (
        <div className={styles.Image}>
            <img
                src={src}
                alt={alt}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={styles.normal}
            />

            <div className="modal modal-lg fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <img className={styles.img} src={src} alt={alt}/>
                </div>
            </div>

        </div>

    );
};

export default Image;
