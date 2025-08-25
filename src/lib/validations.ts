import { z } from "zod";

export const teamSchema = z.object({
  name: z.string().min(2).max(100),
  college: z.string().min(2).max(100),
  members: z.array(z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().regex(/^\+?[1-9][0-9]{7,14}$/),
    role: z.string(),
  })).min(1).max(4),
  skills: z.array(z.string()).min(1),
});

export const individualSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9][0-9]{7,14}$/),
  college: z.string().min(2).max(100),
  skills: z.array(z.string()).min(1),
});
