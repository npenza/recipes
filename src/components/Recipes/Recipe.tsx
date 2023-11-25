"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "~/hooks/getRecipe";
import { Avatar, Heading, Skeleton } from "@chakra-ui/react";
import Image from "next/image";
import Editor from "../Editor";
import axios from "axios";

export function Recipe({
  username,
  recipeTitle,
}: {
  username: string;
  recipeTitle: string;
}) {

  // Fetch recipe
  const { data: recipe, isLoading } = useQuery({
    queryKey: [recipeTitle],
    queryFn: () => getRecipe(username, recipeTitle),
  });

  // Load inital data for recipe into editor. Save Updates here..
  const [data, setData] = useState<JSON | null>(null);

  // Update recipe content in database
  const handleUpdateRecipeInDb = async (data: JSON) => {
    if (data) {
      const response = await axios.patch(
        `/api/recipe/${username}/${recipeTitle}`,
        {
          recipeBlockContent: data,
        },
      );

      // TODO: Show toast, handle success and error
    }
  };

  return (
    <div className="mx-auto mt-4 flex max-w-7xl flex-col items-center justify-center ">

      {/* Header Image */}
      <Skeleton isLoaded={!isLoading}>
        <Image
          src={recipe?.image ?? ""}
          alt={recipe?.title ?? ""}
          className="h-72 rounded-md object-cover"
          width={800}
          height={200}
        />
      </Skeleton>

      {/* Recipe Heading */}
      <Skeleton noOfLines={1} isLoaded={!isLoading}>
        <Heading className="mt-4">{recipe?.title ?? ""}</Heading>
      </Skeleton>

      {/* Recipe Author Info */}
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

      {/* Recipe Editor Content */}
      {recipe && (
        <div className="editor w-[100%] max-w-7xl bg-white">
          <Editor
            data={recipe?.recipeBlockContent}
            onChange={setData}
            editorblock="editorjs-container"
          />
          <button
            className="savebtn"
            onClick={() => handleUpdateRecipeInDb(data!)}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
