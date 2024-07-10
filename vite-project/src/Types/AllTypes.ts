export interface IImage {
   url: string;
   filename: string;
 }
 
 export interface IPost {
   _id: string;
   title: string;
   content: string;
   description?: string;
   author: any;
   likes: string[];
   comments: IComment[];
   images: IImage[];
   createdAt: string;
   updatedAt: string;
 }
 
 export interface IComment {
   _id: string;
   content: string;
   author: string;
   post: string;
   image?: File | string;
   createdAt: string;
   updatedAt: string;
 }
 