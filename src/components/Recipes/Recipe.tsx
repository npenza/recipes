"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";
import { getRecipe } from "~/hooks/getRecipe";

export function Recipe({ username, recipeTitle }) {
  // Fetch recipes
  const { data, isLoading } = useQuery({
    queryKey: [recipeTitle],
    queryFn: () => getRecipe(username, recipeTitle),
  });

  return (
    <>
      {data && <p>{data.title} by {data.author.name}</p>}
      {isLoading && <p>Loading</p>}
    </>
  );
}
