"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeCard from "~/components/Recipes/RecipeCard";

export default function page() {
  const [recipes, setRecipes] = useState<Recipe[] | []>([]);

  // TODO: Convert this to react query
  useEffect(() => {
    async function fetchAuthRecipes() {
      try {
        const response = await axios.get("/api/recipes/");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setRecipes(response.data?.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }

    void fetchAuthRecipes();
  }, []);

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

      {/* Recipe Grid */}
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-7xl lg:grid-cols-4">
        {/* Recipe Item */}
        {recipes?.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>

      {/* Callout (Create new recipe) */}
    </div>
  );
}
