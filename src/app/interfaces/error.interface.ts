export interface ErrorInterface {
    
    error: ErrorDetailInterface;


}

export interface ErrorDetailInterface {
    
    message: string[];

    error: string;

    statusCode: number;

}