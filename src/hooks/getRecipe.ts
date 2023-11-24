import axios, { AxiosError } from "axios";

export const getRecipe = async (
  username: string,
  recipeTitle: string,
): Promise<Recipe> => {
  try {
    const response = await axios.get<Recipe>("/api/recipe", {
      params: {
        username: username,
        title: recipeTitle,
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error: AxiosError) {
    return error;
  }
};
