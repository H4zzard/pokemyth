"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { waitlistSchema, type WaitlistInput } from "@/lib/schemas";
import { submitWaitlist } from "@/lib/services/waitlist-service";
import { Input, Label, FieldError } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster";
import { waitlistConfig } from "@/lib/config/waitlist";

export function WaitlistForm() {
  const { toast } = useToast();
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [done, setDone] = React.useState<{
    position: number | null;
    redirectUrl: string;
  } | null>(null);

  const form = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { fullName: "", username: "", email: "", discord: "" },
  });

  async function onSubmit(data: WaitlistInput) {
    const res = await submitWaitlist(data);

    if (!res.ok) {
      toast({
        tone: "error",
        title: "Não foi possível concluir",
        description: res.error.message,
      });
      return;
    }

    setDone({ position: res.data.position, redirectUrl: res.data.redirectUrl });
  }

  if (done) {
    return <WaitlistSuccess position={done.position} redirectUrl={done.redirectUrl} />;
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <Label htmlFor="fullName">Seu nome</Label>
        <Input
          id="fullName"
          autoComplete="name"
          placeholder="Como podemos te chamar"
          {...form.register("fullName")}
        />
        <FieldError message={form.formState.errors.fullName?.message} />
      </div>

      <div>
        <Label htmlFor="username">Nome de usuário desejado no jogo</Label>
        <Input
          id="username"
          placeholder="SeuNick"
          autoComplete="off"
          {...form.register("username")}
        />
        <p className="mt-1.5 text-xs text-muted/80">
          Reservamos este nick para você, se estiver disponível.
        </p>
        <FieldError message={form.formState.errors.username?.message} />
      </div>

      <div>
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="voce@exemplo.com"
          {...form.register("email")}
        />
        <FieldError message={form.formState.errors.email?.message} />
      </div>

      <div>
        <Label htmlFor="discord">Usuário do Discord</Label>
        <Input
          id="discord"
          placeholder="treinador.pmo"
          autoComplete="off"
          {...form.register("discord")}
        />
        <p className="mt-1.5 text-xs text-muted/80">
          É por lá que falamos com os fundadores selecionados.
        </p>
        <FieldError message={form.formState.errors.discord?.message} />
      </div>

      <label className="flex cursor-pointer items-start gap-2.5 pt-1">
        <Checkbox
          checked={acceptTerms}
          onCheckedChange={(v) => {
            setAcceptTerms(v);
            form.setValue("acceptTerms", v as true, { shouldValidate: true });
          }}
        />
        <span className="text-sm text-muted">
          Aceito ser contatado por e-mail e Discord sobre o beta fechado e li as{" "}
          <Link href="/rules" className="text-magenta hover:underline">
            regras do servidor
          </Link>
          .
        </span>
      </label>
      <FieldError message={form.formState.errors.acceptTerms?.message} />

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Enviando…" : "Enviar candidatura"}
      </Button>

      <p className="text-center text-xs text-muted/70">
        Usamos seus dados apenas para o processo de seleção dos fundadores.
      </p>
    </form>
  );
}

function WaitlistSuccess({
  position,
  redirectUrl,
}: {
  position: number | null;
  redirectUrl: string;
}) {
  const [seconds, setSeconds] = React.useState<number>(
    waitlistConfig.redirectDelaySeconds
  );

  React.useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    if (seconds === 0) window.location.href = redirectUrl;
  }, [seconds, redirectUrl]);

  return (
    <div className="text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-300" />
      <h2 className="heading-display mt-4 text-2xl">Candidatura registrada</h2>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
        {position
          ? `Você é a candidatura nº ${position}. `
          : "Recebemos seus dados. "}
        O próximo passo é entrar no nosso Discord — é lá que anunciamos os{" "}
        {waitlistConfig.totalSpots} fundadores selecionados e entregamos os itens
        exclusivos.
      </p>

      <a href={redirectUrl} rel="noopener noreferrer">
        <Button size="lg" className="mt-6 w-full">
          <MessageCircle className="h-4 w-4" /> Entrar no Discord agora
        </Button>
      </a>

      <p className="mt-3 text-xs text-muted/80">
        Redirecionando automaticamente em {seconds}s…
      </p>

      <Link
        href="/"
        className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
      >
        Voltar ao site <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
