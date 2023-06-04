import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  // console.log(props);
  const { resData } = props;

  const {
    name,
    cuisines,
    avgRating,
    deliveryTime,
    costForTwo,
    cloudinaryImageId,
  } = resData?.data;

  return (
    <div className="resto-card">
      {<img src={CDN_URL + cloudinaryImageId}></img>}

      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{deliveryTime} mins</h4>
      <h4>₹{costForTwo / 100} FOR TWO</h4>
    </div>
  );
};

export default RestaurantCard;
