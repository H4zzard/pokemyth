import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Informe um e-mail válido."),
  password: z.string().min(6, "A senha deve ter ao menos 6 caracteres."),
  remember: z.boolean().optional(),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Mínimo de 3 caracteres.")
      .max(20, "Máximo de 20 caracteres.")
      .regex(/^[a-zA-Z0-9_]+$/, "Use apenas letras, números e underline."),
    email: z.string().email("Informe um e-mail válido."),
    password: z.string().min(6, "A senha deve ter ao menos 6 caracteres."),
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "Você precisa aceitar os termos." }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });
export type RegisterInput = z.infer<typeof registerSchema>;

export const marketCategoryEnum = z.enum([
  "criaturas",
  "itens",
  "equipamentos",
  "recursos",
  "colecionaveis",
  "outros",
]);

export const sellListingSchema = z.object({
  category: marketCategoryEnum,
  title: z.string().min(3, "Informe o nome do produto.").max(60),
  quantity: z.coerce.number().int().min(1, "Quantidade mínima é 1.").max(9999),
  price: z.coerce.number().min(1, "Preço mínimo é R$ 1,00.").max(100000),
  description: z
    .string()
    .min(10, "Descreva o item com ao menos 10 caracteres.")
    .max(600),
  confirmItem: z.literal(true, {
    errorMap: () => ({ message: "Confirme que você possui o item." }),
  }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Aceite os termos do Market." }),
  }),
});
export type SellListingInput = z.infer<typeof sellListingSchema>;

export const supportSchema = z.object({
  subject: z.string().min(3, "Informe um assunto.").max(120),
  category: z.enum(["conta", "pagamento", "market", "bug", "denuncia", "outro"]),
  email: z.string().email("Informe um e-mail válido."),
  message: z.string().min(20, "Descreva com ao menos 20 caracteres.").max(2000),
});
export type SupportInput = z.infer<typeof supportSchema>;
