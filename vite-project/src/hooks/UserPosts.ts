import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { IPost, IComment } from "../Types/AllTypes";



const baseURL = `${import.meta.env.VITE_BASE_URL}`;
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

const fetchPosts = async () => {
  const { data } = await axios.get(`${baseURL}api/posts`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` }
  });
  return data;
};

// const fetchPostById = async (id: string) => {
//   const { data } = await axios.get(`${baseURL}api/posts/${id}`, {
//     headers: { Authorization: `Bearer ${getAuthToken()}` }
//   });
//   return data;
// };

const createPost = async (formData: FormData) => {
   try {
     const { data } = await axios.post(`${baseURL}api/posts`, formData, {
       headers: {
         'Content-Type': 'multipart/form-data',
         Authorization: `Bearer ${getAuthToken()}`
       }
     });
     console.log(data);
     
     return data;
   } catch (error) {
     console.error('Error creating post:', error);
     throw error;
   }
 };
 

const updatePost = async ({ postId, postData }: { postId: string, postData: Partial<IPost> }) => {
  const { data } = await axios.patch(`${baseURL}api/posts/${postId}`, postData, {
    headers: { Authorization: `Bearer ${getAuthToken()}` }
  });
  return data;
};

const deletePost = async (postId: string) => {
   console.log(postId,2233);
   
  await axios.delete(`${baseURL}api/posts/${postId}`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` }
  });
};

const likePost = async (postId: string) => {
  await axios.post(`${baseURL}api/posts/${postId}/like`, {}, {
    headers: { Authorization: `Bearer ${getAuthToken()}` }
  });
};

const commentPost = async ({ postId, commentData }: { postId: string, commentData: Partial<IComment> }) => {
  const { data } = await axios.post(`${baseURL}api/posts/${postId}/comment`, commentData, {
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`
    }
  });
  return data;
};

const usePosts = () => {
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading, error, refetch } = useQuery('posts', fetchPosts);

//   const fetchPostByIdQuery = useQuery(['post', 'byId'], () => fetchPostById(''), {
//     enabled: false,
//     staleTime: 1000 * 60 * 10,
//     cacheTime: 1000 * 60 * 30,
//   });

  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  });

  const updateMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  });

  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  });

  const likeMutation = useMutation(likePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  });

  const commentMutation = useMutation(commentPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  });

  const fetchPostById = async (id: string) => {
    const { data } = await axios.get(`${baseURL}api/posts/${id}`, {
      headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return data;
  };

  return {
    posts: posts as IPost[],
    isLoading,
    error,
    refetch,
    fetchPostById: fetchPostById,
    createPost: createMutation.mutate,
    updatePost: updateMutation.mutate,
    deletePost: deleteMutation.mutate,
    likePost: likeMutation.mutate,
    commentPost: commentMutation.mutate
  };
};

export default usePosts;
