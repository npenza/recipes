import type { NextRequest } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export async function GET(request: NextRequest) {
  const session = await getServerAuthSession(); // neat auth session wrapper from t3 stack

  // If user is not signed in
  if (!session) {
    return Response.json({ error: "Not logged in" });
  }

  //   Get params
  const url = request.nextUrl;
  const username =  url.searchParams.get("username");
  const title =  url.searchParams.get("title");

  const authorOfRecipe = await db.user.findFirst({
    where : {
        name: username
    }
  })

  const recipe = await db.recipe.findFirst({
    where : {
        authorId: authorOfRecipe?.id,
        title: title
    },
    include : {
      author: true
    }
  })

  return Response.json({ ...recipe });
}
