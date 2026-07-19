"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supportSchema, type SupportInput } from "@/lib/schemas";
import { Input, Textarea, Select, Label, FieldError } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster";

const categoryOptions: { value: SupportInput["category"]; label: string }[] = [
  { value: "conta", label: "Conta" },
  { value: "pagamento", label: "Pagamento" },
  { value: "market", label: "Market" },
  { value: "bug", label: "Bug" },
  { value: "denuncia", label: "Denúncia" },
  { value: "outro", label: "Outro" },
];

export function SupportForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SupportInput>({
    resolver: zodResolver(supportSchema),
    defaultValues: { category: "conta" },
  });

  function onSubmit(_data: SupportInput) {
    // TODO: enviar para o backend de suporte (Supabase / helpdesk).
    toast({
      tone: "info",
      title: "Integração com servidor pendente",
      description:
        "O envio de tickets será ativado ao conectar o backend de suporte.",
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <Label htmlFor="subject">Assunto</Label>
        <Input id="subject" placeholder="Resumo do seu problema" {...register("subject")} />
        <FieldError message={errors.subject?.message} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="category">Categoria</Label>
          <Select id="category" {...register("category")}>
            {categoryOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="email">E-mail para contato</Label>
          <Input id="email" type="email" placeholder="voce@exemplo.com" {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
      </div>
      <div>
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          id="message"
          className="min-h-[160px]"
          placeholder="Descreva com detalhes. Inclua nomes de personagem, IDs de transação e datas quando possível."
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Enviando…" : "Enviar solicitação"}
      </Button>
    </form>
  );
}
