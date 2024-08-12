export type SignupData = {
    email: string;
    password: string;
    name: string;
  };
  
 export  type SigninData = {
    login: string;
    password: string;
  };

export type SignUpRequest ={
    first_name: string
    second_name: string
    login: string
    email: string
    phone: string
    password: string
  }
  
  export interface UserData {
    id: number;
    first_name: string;
    second_name: string;
    email: string;
    login: string;
    display_name: string;
    phone: string;
    avatar?: string; // необязательное поле
    // photoUrl?: string;
  }
