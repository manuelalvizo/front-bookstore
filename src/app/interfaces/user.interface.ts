export interface UserInterface {
    
    name?: string;
  
    email: string;

    password: string;
  
    roles ?: string[];
}

export interface LoginInterface {
    
    user: UserInterface;
  
    token: string
}