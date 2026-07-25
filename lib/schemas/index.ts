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

/**
 * Waitlist de Players Fundadores.
 * Os nomes dos campos devem bater com os cabeçalhos da planilha
 * (ver `scripts/apps-script/waitlist.gs`).
 */
export const waitlistSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Informe seu nome.")
    .max(80, "Máximo de 80 caracteres."),
  username: z
    .string()
    .trim()
    .min(3, "Mínimo de 3 caracteres.")
    .max(20, "Máximo de 20 caracteres.")
    .regex(/^[a-zA-Z0-9_]+$/, "Use apenas letras, números e underline."),
  email: z.string().trim().email("Informe um e-mail válido."),
  discord: z
    .string()
    .trim()
    .min(2, "Informe seu usuário do Discord.")
    .max(37, "Usuário do Discord inválido.")
    // Formato novo (nome.usuario) ou legado (Nome#1234).
    .regex(
      /^(?:[a-zA-Z0-9._]{2,32}|.{2,32}#\d{4})$/,
      "Use seu @ do Discord (ex.: treinador.pmo)."
    ),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Você precisa aceitar os termos." }),
  }),
});
export type WaitlistInput = z.infer<typeof waitlistSchema>;

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
