import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {

  enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
  }

  interface User {
    id: string;
    username: string;
    fullName?: string;
    phoneNumber: string;
    role: Role;
    createdAt: Date;
  }

  interface Session {
    user: User & {
        id: string;
        username: string;
        fullName?: string;
        phoneNumber: string;
        role: Role;
        createdAt: Date;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    fullName?: string;
    phoneNumber: string;
    role: Role;
    createdAt: Date;
  }
}