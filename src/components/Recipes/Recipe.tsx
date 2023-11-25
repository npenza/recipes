"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "~/hooks/getRecipe";
import { Avatar, Heading, Skeleton } from "@chakra-ui/react";
import Image from "next/image";

export function Recipe({
  username,
  recipeTitle,
}: {
  username: string;
  recipeTitle: string;
}) {
  // Fetch recipes
  const { data: recipe, isLoading } = useQuery({
    queryKey: [recipeTitle],
    queryFn: () => getRecipe(username, recipeTitle),
  });

  return (
    <div className="mx-auto mt-4 flex max-w-7xl flex-col items-center justify-center ">
      <Skeleton isLoaded={!isLoading}>
        <Image
          src={recipe?.image}
          className="h-72 rounded-md object-cover"
          width={800}
          height={200}
        />
      </Skeleton>

      <Skeleton noOfLines={1} isLoaded={!isLoading}>
        <Heading className="mt-4">{recipe?.title ?? ""}</Heading>
      </Skeleton>

      <Skeleton noOfLines={1} isLoaded={!isLoading}>
        <div className="mt-2 flex flex-row items-center justify-center space-x-2">
          <Avatar
            name={recipe?.author.name}
            src={recipe?.author.image}
            size={"sm"}
          />
          <span className="text-gray-600 ">
            Recipe by {recipe?.author.name}
          </span>
        </div>
      </Skeleton>
    </div>
  );
}
