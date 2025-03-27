import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "Nova senha obrigatória!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "A senha é obrigatória.",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Pelo menos uma letra maiúscula.",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Pelo menos uma letra minúscula.",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Pelo menos um número.",
    })
    .refine((value) => /[\W_]/.test(value), {
      message: "Pelo menos um caractere especial.",
    }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Formato de email inválido.",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Formato de email inválido.",
  }),
  password: z.string().min(1, {
    message: "A senha é obrigatória.",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(1, { message: "O nome é obrigatório" })
    .refine((value) => isNaN(Number(value)), {
      message: "Somente letras são permitidas.",
    }),
  email: z.string().email({
    message: "Formato de email inválido.",
  }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Pelo menos uma letra maiúscula.",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Pelo menos uma letra minúscula.",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "Pelo menos um número.",
    })
    .refine((value) => /[\W_]/.test(value), {
      message: "Pelo menos um caractere especial.",
    }),
});
