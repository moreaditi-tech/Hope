import { useState } from "react";
import { Star } from "lucide-react";

const StarRating = ({ rating, onRatingChange, readonly = false }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => {
                const index = i + 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={`${readonly ? "cursor-default" : "cursor-pointer"
                            } bg-transparent border-none outline-none focus:outline-none transition-colors duration-200`}
                        onClick={() => !readonly && onRatingChange(index)}
                        onMouseEnter={() => !readonly && setHover(index)}
                        onMouseLeave={() => !readonly && setHover(rating)}
                    >
                        <Star
                            size={20}
                            fill={index <= (hover || rating) ? "#fbbf24" : "none"} // amber-400
                            color={index <= (hover || rating) ? "#fbbf24" : "#d1d5db"} // gray-300
                        />
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;
