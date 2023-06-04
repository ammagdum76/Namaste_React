import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";

export const Body = () => {
  const [listOfRestaurants, setlistOfRestaurants] = useState([]);
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);
  const [searchText, setsearchText] = useState("");

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    let data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=16.7049873&lng=74.24325270000001&page_type=DESKTOP_WEB_LISTING"
    );
    let json = await data.json();
    // let data = await fetch(
    //   "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING"
    // );
    // let json = await data.json();

    setlistOfRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setfilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
  };

  // conditional rendering
  //if restaurant is empty, show shimmer UI
  // if restaurant has data, show it on UI

  // not render component (Early return)
  if (!listOfRestaurants) return null;

  // below start rendering the component
  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="search">
        <button
          className="filter-btn"
          onClick={() => {
            let filterData = listOfRestaurants.filter(
              (res) => res.data.avgRating > 4
            );
            setfilteredRestaurants(filterData);
          }}
        >
          Rating: 4+
        </button>
        <input
          type="text"
          placeholder="Search for restaurant, cuisine or dish"
          value={searchText}
          onChange={(e) => {
            setsearchText(e.target.value);
          }}
        ></input>

        <button
          className="search-btn"
          onClick={() => {
            let filteredList = listOfRestaurants.filter((res) => {
              return res?.data?.name
                ?.toLowerCase()
                ?.includes(searchText.toLowerCase());
            });
            setfilteredRestaurants(filteredList);
          }}
        >
          Search
        </button>
      </div>

      <div className="card-container">
        {filteredRestaurants.map((restaurant) => {
          return (
            <Link
              key={restaurant.data.id}
              to={"/restaurants/" + restaurant.data.id}
            >
              {" "}
              <RestaurantCard resData={restaurant} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// export default Body;
