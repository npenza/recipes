import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { user: string; slugTitle: string } },
) {
  const { user, slugTitle } = params;

  // find user
  const prismaUser = await db.user.findFirst({
    where: {
      name: user,
    },
    include: {
      recipes: {
        include: {
          author: true,
        },
      },
    },
  });

  const foundRecipe = prismaUser?.recipes.find(
    (recipe) => recipe.slugTitle === slugTitle,
  );

  return NextResponse.json({ ...foundRecipe });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { user: string; slugTitle: string } },
) {
  const { user, slugTitle } = params;
  const json = await req.json();

  // find user
  const prismaUser = await db.user.findFirst({
    where: {
      name: user,
    },
    include: {
      recipes: {
        include: {
          author: true,
        },
      },
    },
  });

  // find recipe ID
  const foundRecipe = prismaUser?.recipes.find(
    (recipe) => recipe.slugTitle === slugTitle,
  );

  const recipeToEdit = await db.recipe.update({
    where: {
      id: foundRecipe?.id,
    },
    data: json,
  });

  return NextResponse.json({ ...recipeToEdit });
}
