type Recipe = {
    id : string;
    title: string;
    image: string;
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