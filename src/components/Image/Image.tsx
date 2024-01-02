import React, { useState } from 'react';

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
        <div>
            <img
                src={src}
                alt={alt}
                onClick={handleClick}
            />
            {zoomed && <div onClick={handleClick} />}
        </div>

    );
};

export default Image;
