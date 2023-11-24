"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import RecipeCard from "~/components/Recipes/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import { getAuthRecipes } from "~/hooks/getAuthRecipes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AuthRecipesGrid() {
    
  // Fetch recipes
  const { data } = useQuery({
    queryKey: ["auth-recipes"],
    queryFn: getAuthRecipes,
  });

  return (
    <div>
      {/* Filter / Search Tags Menu */}
      <div className="mx-auto my-4 flex max-w-7xl flex-row">
        <a
          href="/recipes/create"
          className="flex space-x-2 rounded-md bg-green-500 px-2 py-1 text-sm font-bold text-white"
        >
          <PlusIcon color="white" className="w-4 font-bold" /> Add New Recipe
        </a>
      </div>

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-7xl lg:grid-cols-4">
        {/* Recipe Item */}
        {data
          ? data.recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))
          : Array.from({ length: 4 }, (_, index) => (
              <Skeleton
                className="mx-auto flex h-72 max-w-[18rem]"
                key={index}
              />
            ))}
      </div>

      {/* Callout (Create new recipe) */}
    </div>
  );
}

export default AuthRecipesGrid;
