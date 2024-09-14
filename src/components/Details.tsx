import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { DataContext } from "../context/DataProvider";

type Anchor = "top" | "left" | "bottom" | "right";

export default function Details() {
  const { open, setOpen, meal } = React.useContext(DataContext);

  const list = (anchor: Anchor) => (
    <div className="max-w-96 p-2">
      <div className="border-b-2 mb-4">
        <h1 className="text-2xl text-center">{meal.strMeal}</h1>
      </div>
      <img
        src={meal?.strMealThumb}
        alt={meal?.strMeal}
        className=" object-cover"
      />
      <div className="flex gap-2 my-3">
        {meal?.strTags?.split(",").map((item: string) => (
          <span className="px-3 py-1 border-2 border-orange-400 bg-orange-200 rounded-full text-sm">
            {item}
          </span>
        ))}
      </div>
      <div className="max-w-full text-slate-600">
        <div className="grid grid-cols-2 my-2">
          <p className="text-sm">Category</p>
          <p className="text-sm">{meal?.strCategory}</p>
        </div>
        <div className="grid grid-cols-2 my-2">
          <p className="text-sm">Area</p>
          <p className="text-sm text-wrap">{meal?.strArea}</p>
        </div>
        <div className="grid grid-cols-2 my-2">
          <p className="text-sm">Youtube</p>

          <a className="text-sm break-words" href={meal?.strYoutube}>
            {meal?.strYoutube}
          </a>
        </div>
        <div className="grid grid-cols-2 my-2">
          <p className="text-sm">Recipe</p>

          <a className="text-sm break-words" href={meal?.strSource}>
            {meal?.strSource}
          </a>
        </div>
      </div>
      <div className="p-2 border-2 border-gray-300 rounded-sm">
        <h1 className="text-slate-800">Instructions</h1>
        <p className="text-sm text-slate-600">{meal?.strInstructions}</p>
      </div>
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor={"right"}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        {list("right")}
      </SwipeableDrawer>
    </div>
  );
}
