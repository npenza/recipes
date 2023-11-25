type Recipe = {
    id : string;
    title: string;
    slugTitle: string;
    image: string;
    recipeBlockContent ?: RecipeBlockContent;
    author: User;
    authorId: string;
}

type User = {
    id: string;
    name ?: string;
    email ?: string;
    image ?: string;
    recipes ?: Recipe[];
}

// Recipe Block

type RecipeBlockContent = {
    time : number;
    blocks : RecipeBlock[];
}

type RecipeBlock = {
    id : string;
    type : string;
    data : {
        level ?: number;
        text ?: string;
    }
}