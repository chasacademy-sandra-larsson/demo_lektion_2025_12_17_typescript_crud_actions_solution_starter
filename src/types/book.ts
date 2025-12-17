// 1. Alternativ 1 - "nybörjaren"

// export interface NewBook {
//     title: string;
//     author: string;
// }

// export interface BookUpdates {
//     id: string;
//     title: string;
//     author: string;
// }


// 2. Seniora använder utility types! Vi kommer gå igenom mer om det efter jul
export interface Book {
    id: string;
    title: string;
    author: string;
}

// Använda utility types - Omit, Partital

export type NewBook = Omit<Book,'id'>
export type BookUpdates = Partial<Book>

