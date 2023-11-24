import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export async function GET() {
  const session = await getServerAuthSession(); // neat auth session wrapper from t3 stack

  // If user is not signed in
  if (!session) {
    return Response.json({ error: "Not logged in" });
  }

  // Get Recipes from user
  try {
    const response = await db.user.findUnique({
      where: {
        email: session.user.email!,
      },
      include: {
        recipes: true,
      },
    });

    return Response.json({ recipes: response?.recipes });
  } catch (err) {
    return Response.json({ error: "Request failed" });
  }
}
