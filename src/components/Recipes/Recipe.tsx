"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";
import { getRecipe } from "~/hooks/getRecipe";

export function Recipe({
  username,
  recipeTitle,
}: {
  username: string;
  recipeTitle: string;
}) {
  // Fetch recipes
  const { data : recipe, isLoading } = useQuery({
    queryKey: [recipeTitle],
    queryFn: () => getRecipe(username, recipeTitle),
  });

  return (
    <>
      {recipe && (
        <div className="max-w-7xl mx-auto">
          <h1 className="capitalize text-center">{recipe.title}</h1>
        </div>
      )}
      {isLoading && <p>Loading</p>}
    </>
  );
}
