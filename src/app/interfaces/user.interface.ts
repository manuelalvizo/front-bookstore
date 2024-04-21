export interface UserInterface {
    
    id?:string

    name?: string;
  
    email: string;

    password: string;
  
    roles ?: string[];
}

export interface UsersInterface {
    
    users: UserInterface[];
    
    totalElements: number
}


export interface LoginInterface {
    
    user: UserInterface;
  
    token: string
}