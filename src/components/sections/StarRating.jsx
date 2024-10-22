import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const StarRating = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <span
            key={index}
            onClick={() => onRatingChange(currentRating)} // Set the rating when clicked
            onMouseEnter={() => setHover(currentRating)} // Show hover effect
            onMouseLeave={() => setHover(null)} // Remove hover effect
          >
            {currentRating <= (hover || rating) ? (
              <AiFillStar className="text-green-500 text-2xl" />
            ) : (
              <AiOutlineStar className="text-green-500 text-2xl" />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
