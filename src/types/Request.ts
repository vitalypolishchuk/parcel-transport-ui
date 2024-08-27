export interface Request {
    id: string;
    requestType: string;
    fromCity: string;
    toCity: string;
    parcelType: string;
    dispatchDate: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}