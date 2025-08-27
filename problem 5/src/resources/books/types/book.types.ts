
export interface BookAttributes {
    id: number;
    title: string;
    author: string;
    publishedYear: number;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface BookInput {
    title: string;
    author: string;
    publishedYear: number;
    description: string;
}
