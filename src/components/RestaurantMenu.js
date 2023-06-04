import { useEffect, useState } from "react";
import Shimmer from "./shimmer";
import { CDN_URL, MENU_API } from "../utils/constants";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [restaurantMenu, setrestaurantMenu] = useState(null);

  const { resId } = useParams();
  console.log(resId);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);

    const json = await data.json();

    // const data = await fetch(
    //   "https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=" +
    //     resId
    // );

    // const json = await data.json();

    console.log(json.data);

    setrestaurantMenu(json.data);
  };

  if (restaurantMenu === null) return <Shimmer />;

  const { name, avgRating, costForTwoMessage, cuisines, cloudinaryImageId } =
    restaurantMenu?.cards[0]?.card?.card?.info;

  const { itemCards } =
    restaurantMenu?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card;
  console.log(itemCards);

  return (
    <div className="res-menu">
      <img src={CDN_URL + cloudinaryImageId} alt="img" />
      <h1>{name}</h1>
      <p>
        {cuisines.join(", ")} - {avgRating} stars
      </p>
      <p>{costForTwoMessage}</p>
      <p></p>
      <h3>Menu</h3>
      <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} -: {"Rs."}{" "}
            {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
