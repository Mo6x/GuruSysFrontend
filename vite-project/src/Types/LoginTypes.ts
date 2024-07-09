export interface LoginFormData {
   email: string;
   password: string;
 }
 
 export interface LoginResponse {
   user: {
     id: string;
     username: string;
     email: string;
   };
   token: string;
 }
 