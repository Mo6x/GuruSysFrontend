export interface RegisterFormData {
   username: string;
   email: string;
   password: string;
 }
 
 export interface RegisterResponse {
   user: {
     id: string;
     username: string;
     email: string;
   };
   token: string;
 }
 