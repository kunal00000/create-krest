import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config";

type User = {
  id: number;
  email: string;
  password: string;
};

let Users: User[] = [
  {
    id: 1,
    email: "user1@example.com",
    password: "User1-password"
  }
];

export const userSignup = (req: Request, res: Response) => {
  const newUser = req.body;
  const userExist = Users.find((user) => user.email === newUser.email);
  if (userExist) {
    res.status(400).json({ message: "Email already exists" });
  } else {
    Users.push({ id: Users[Users.length - 1].id + 1, ...newUser } as User);
    const token = jwt.sign({ email: newUser.email }, JWT_SECRET, {
      expiresIn: "1h" // token expires in 1 hour
    });
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
      token: token
    });
  }
};

export const userLogin = (req: Request, res: Response) => {
  const { email, password } = req.headers;
  const user = Users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "1h"
    });
    res.status(200).json({ message: "User found", data: user, token: token });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
