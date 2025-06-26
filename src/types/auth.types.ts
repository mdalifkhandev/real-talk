export type AuthUser = {
    _id: string;
  email: string;
  fullName: string;
  profilePic: string;
  createdAt: string; 
  updatedAt: string;  
}
export interface DecodedToken {
  userId: string;
  password: string;
  iat: number;
  exp: number;
}


export type AuthFromData={
    fullName?:string,
    email:string,
    password:string,
}


export interface AuthState {
  authUser: AuthUser | null;
  isSignInUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers:AuthUser[]
  socket:any
  checkAuth: () => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  login: (data: any) => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  connectSocket: () => Promise<void>;
  disConnectSocket: () => void;
}
