import axios, { AxiosError } from "axios";

export const getAuthRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await axios.get<Recipe[]>("/api/recipes");
    console.log(response);
    return response.data;
  } catch (error: AxiosError) {
    return error;
  }
};
