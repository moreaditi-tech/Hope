import { useState } from "react";

const ImageWithLoader = ({ src, alt, className }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* SKELETON LOADER (Visible until loaded) */}
            {!loaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
            )}

            {/* ACTUAL IMAGE */}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
                    }`}
            />
        </div>
    );
};

export default ImageWithLoader;
