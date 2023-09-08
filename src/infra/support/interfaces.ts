import container from "../../container";

const {
  user,
  comment,
  post,
  createPost,
  getPost,
  getPosts,
  getUserPosts,
  updatePost,
  deletePost,
  searchAndFilterPosts,
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  searchAndFilterUsers,
  signIn,
  userRepository,
  postRepository,
  psqlClient,
  appConfig,
} = container.cradle;

export type Table = typeof user | typeof comment | typeof post;
export type ShutdownFunction = () => Promise<void>;

export interface IQueryOptions {
  selectedColumns?: string[];
  excludedColumns?: string[];
  include?: Array<Table>;
  clause?: object;
  page?: number;
  limit?: number;
}

export interface IUserUsecase {
  userRepository: typeof userRepository;
  config: typeof appConfig;
  psqlClient?: typeof psqlClient;
  Post?: typeof post;
}

export interface IPostUsecase {
  postRepository: typeof postRepository;
  config: typeof appConfig;
  psqlClient?: typeof psqlClient;
}

export interface IUserController {
  createUser: typeof createUser;
  getUser: typeof getUser;
  updateUser: typeof updateUser;
  deleteUser: typeof deleteUser;
  getUsers: typeof getUsers;
  signIn: typeof signIn;
  searchAndFilterUsers: typeof searchAndFilterUsers;
}

export interface IPostController {
  createPost: typeof createPost;
  getUserPosts: typeof getUserPosts;
  getPosts: typeof getPosts;
  getPost: typeof getPost;
  updatePost: typeof updatePost;
  deletePost: typeof deletePost;
  searchAndFilterPosts: typeof searchAndFilterPosts;
}

export interface IError extends Error {
  status?: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  gender: string;
  email?: string;
  password?: string;
}

export interface IUserQueryOptions {
  gender?: string;
  name?: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

export interface IPostQueryOptions {
  title?: string | object;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

export interface IPost {
  title: string;
  post: string;
  userId?: string;
}

export interface IAuth {
  email: string;
  password: string;
}
