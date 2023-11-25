import axios from "axios";

export const getRecipe = async (
  username: string,
  recipeTitle: string,
): Promise<Recipe> => {
  try {
    const response = await axios.get<Recipe>("/api/recipe", {
      params: {
        username: username,
        slugTitle: recipeTitle,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
