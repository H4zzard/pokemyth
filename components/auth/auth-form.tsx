"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from "@/lib/schemas";
import { Input, Label, FieldError } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster";
import { signIn, signUp } from "@/lib/services/auth-service";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const { toast } = useToast();
  const [remember, setRemember] = React.useState(false);
  const [acceptTerms, setAcceptTerms] = React.useState(false);

  const login = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onLogin(data: LoginInput) {
    const res = await signIn({ ...data, remember });
    if (!res.ok) {
      toast({
        tone: "info",
        title: "Integração de autenticação pendente",
        description:
          "O login real será ativado ao conectar o Supabase Auth. Nenhuma sessão foi criada.",
      });
    }
  }

  async function onRegister(data: RegisterInput) {
    const res = await signUp(data);
    if (!res.ok) {
      toast({
        tone: "info",
        title: "Integração de cadastro pendente",
        description:
          "O cadastro real será ativado ao conectar o Supabase Auth. Nenhuma conta foi criada.",
      });
    }
  }

  return (
    <div className="w-full">
      {/* Aviso de ambiente mockado */}
      <div className="mb-6 flex items-start gap-2 border border-cyan-magic/30 bg-cyan-magic/5 p-3 clip-chamfer-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-magic" />
        <p className="text-xs text-muted">
          Ambiente de demonstração: a autenticação ainda não está conectada.
          Nenhum dado é enviado ou armazenado.
        </p>
      </div>

      {mode === "login" ? (
        <form onSubmit={login.handleSubmit(onLogin)} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="voce@exemplo.com" {...login.register("email")} />
            <FieldError message={login.formState.errors.email?.message} />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="mb-0">Senha</Label>
              <Link href="/support" className="text-xs text-magenta hover:underline">
                Recuperar senha
              </Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" className="mt-1.5" {...login.register("password")} />
            <FieldError message={login.formState.errors.password?.message} />
          </div>
          <label className="flex cursor-pointer items-center gap-2.5">
            <Checkbox checked={remember} onCheckedChange={setRemember} />
            <span className="text-sm text-muted">Lembrar acesso</span>
          </label>
          <Button type="submit" className="w-full" disabled={login.formState.isSubmitting}>
            {login.formState.isSubmitting ? "Entrando…" : "Entrar"}
          </Button>
          <p className="text-center text-sm text-muted">
            Não tem conta?{" "}
            <Link href="/register" className="font-semibold text-magenta hover:underline">
              Criar conta
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="username">Nome de usuário</Label>
            <Input id="username" placeholder="SeuNick" {...registerForm.register("username")} />
            <FieldError message={registerForm.formState.errors.username?.message} />
          </div>
          <div>
            <Label htmlFor="email-r">E-mail</Label>
            <Input id="email-r" type="email" placeholder="voce@exemplo.com" {...registerForm.register("email")} />
            <FieldError message={registerForm.formState.errors.email?.message} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="password-r">Senha</Label>
              <Input id="password-r" type="password" placeholder="••••••••" {...registerForm.register("password")} />
              <FieldError message={registerForm.formState.errors.password?.message} />
            </div>
            <div>
              <Label htmlFor="confirm">Confirmar senha</Label>
              <Input id="confirm" type="password" placeholder="••••••••" {...registerForm.register("confirmPassword")} />
              <FieldError message={registerForm.formState.errors.confirmPassword?.message} />
            </div>
          </div>
          <label className="flex cursor-pointer items-start gap-2.5">
            <Checkbox
              checked={acceptTerms}
              onCheckedChange={(v) => {
                setAcceptTerms(v);
                registerForm.setValue("acceptTerms", v as true, { shouldValidate: true });
              }}
            />
            <span className="text-sm text-muted">
              Li e aceito os{" "}
              <Link href="/rules" className="text-magenta hover:underline">
                termos e regras
              </Link>{" "}
              do PokeMyth Online.
            </span>
          </label>
          <FieldError message={registerForm.formState.errors.acceptTerms?.message} />
          <Button type="submit" className="w-full" disabled={registerForm.formState.isSubmitting}>
            {registerForm.formState.isSubmitting ? "Criando…" : "Criar conta"}
          </Button>
          <p className="text-center text-sm text-muted">
            Já tem conta?{" "}
            <Link href="/login" className="font-semibold text-magenta hover:underline">
              Entrar
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
