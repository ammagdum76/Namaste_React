import { useEffect, useState } from "react";
import { CDN_URL, MENU_API } from "../utils/constants";
import { useParams } from "react-router-dom";
import Shimmer from "./shimmer";

const RestaurantMenu = () => {
  const [resMenu, setresMenu] = useState(null);
  const { resId } = useParams();
  console.log(resId);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();

    console.log(json.data);
    setresMenu(json.data);
  };

  if (resMenu === null) return <Shimmer />;

  const { name, cuisines, avgRating, cloudinaryImageId, costForTwoMessage } =
    resMenu?.cards[0]?.card?.card?.info;

  const { itemCards } =
    resMenu?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  return (
    <div className="menu-item">
      <img src={CDN_URL + cloudinaryImageId}></img>
      <h2>{name}</h2>
      <p>{cuisines.join(", ")}</p>
      <p>
        {avgRating} stars - {costForTwoMessage}
      </p>
      <h3>Menu:</h3>

      {itemCards.map((item) => (
        <li key={item?.card?.info?.id}>
          {item?.card?.info?.name}
          {"-:"} Rs.{item?.card?.info?.price / 100}
        </li>
      ))}
    </div>
  );
};

export default RestaurantMenu;
