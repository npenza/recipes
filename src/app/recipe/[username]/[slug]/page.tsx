import {Recipe} from "~/components/Recipes/Recipe";
import { getServerAuthSession } from "~/server/auth";

export default async function page({ params }: { params: { username: string , slug: string } }) {

  const session = await getServerAuthSession()

  if (session?.user) return <Recipe username={params.username} recipeTitle={params.slug} />

  return <p>You will need to sign in to access your recipe.</p>
  
}
