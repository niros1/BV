
export interface IUser {
    age: number;
    country: string;
    id: string;
    name: string;
    sex: string;
}

export interface IImage {
    id: string;
    name: string;
    path: string;
    emotions: string;
    age: number;
    country: string;
    sex: string;
    color: string

}

export enum EMOTIONS {
    'happiness' = 0,
    'surprise' = 1,
    'disgust' = 2,
    'sadness' = 3,
    'fear' = 4,
    'anger' = 5
}