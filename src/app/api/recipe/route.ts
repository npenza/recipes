import type { NextRequest, NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export async function GET(request: NextRequest) {
  const session = await getServerAuthSession(); // neat auth session wrapper from t3 stack

  // If user is not signed in
  if (!session) {
    return Response.json({ error: "Not logged in" });
  }

  // Get params
  const url = request.nextUrl;
  const username = url.searchParams.get("username");
  const slugTitle = url.searchParams.get("slugTitle");

  const authorOfRecipe = await db.user.findFirst({
    where: {
      name: username,
    },
  });

  // TODO: Run check to see if recipe is private or if session user has access to the recipe
  const recipe = await db.recipe.findFirst({
    where: {
      authorId: authorOfRecipe?.id,
      slugTitle: slugTitle!,
    },
    include: {
      author: true,
    },
  });

  return Response.json({ ...recipe });
}

export async function POST(response: NextResponse, request: NextRequest) {

  // const {message} = request.body.

  console.log(request)

  return Response.json({ Data: "Hello World" });
}
