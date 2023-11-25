import React from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipe/${recipe.author.name}/${recipe.slugTitle}`} className="mx-auto flex max-w-[18rem] flex-col rounded-md border border-gray-200 bg-white hover:scale-105 transition-all duration-100 ease-linear">
      {recipe.image ? <Image
        alt={recipe.title}
        src={recipe.image ?? ""}
        width="250"
        height="350"
        className="h-72 w-72 object-cover"
      /> : <Skeleton />}
      
      <div className="p-3">
        <span className="block pb-1 font-bold capitalize">{recipe.title}</span>
        {/* Recipe Badges */}
        <span className="rounded-md bg-green-200 px-2 py-1 text-sm text-green-800">
          Healthy
        </span>
      </div>
    </Link>
  );
}
