import AuthRecipesGrid from "~/components/Recipes/AuthRecipesGrid";
import { getServerAuthSession } from "~/server/auth";


export default async function page() {


  const session = await getServerAuthSession()

  if (session?.user) return <AuthRecipesGrid />

  return <p>You will need to sign in to access your recipes.</p>
  
}
