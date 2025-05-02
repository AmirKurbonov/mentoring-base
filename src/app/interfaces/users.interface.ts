export interface User {
    id: number;
    name: string;
    username?: string; //знак вопроса означает, что это поле - необязательное
    email:  string;
    adress?: {
        street: string;
        suit?: string;
        city: string;
        zipcode?: string;
        geo?: {
            lat: string;
            lng: string;
        };
    };
    phone?: string;
    website: string;
    company: {
        name: string;
        catchPhrase?: string;
        bs?: string;
    };
}