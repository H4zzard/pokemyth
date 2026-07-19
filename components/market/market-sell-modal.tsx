"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { sellListingSchema, type SellListingInput } from "@/lib/schemas";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, Label, FieldError } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  marketCategoryLabels,
  calcPlatformFee,
  calcNetAmount,
  PLATFORM_FEE_RATE,
} from "@/lib/data/market-items";
import { createMarketListing } from "@/lib/services/market-service";
import { useToast } from "@/components/ui/toaster";
import { formatBRL } from "@/lib/utils";
import type { MarketCategory } from "@/lib/types";

const categories = Object.keys(marketCategoryLabels) as MarketCategory[];

export function MarketSellModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SellListingInput>({
    resolver: zodResolver(sellListingSchema),
    defaultValues: {
      category: "itens",
      quantity: 1,
      price: 10,
      confirmItem: undefined,
      acceptTerms: undefined,
    } as never,
  });

  const price = Number(watch("price")) || 0;
  const fee = calcPlatformFee(price);
  const net = calcNetAmount(price);
  const confirmItem = watch("confirmItem");
  const acceptTerms = watch("acceptTerms");

  React.useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  async function onSubmit(_data: SellListingInput) {
    const res = await createMarketListing(_data);
    if (!res.ok) {
      toast({
        tone: "info",
        title: "Integração com servidor pendente",
        description:
          "A validação do item e a publicação real serão ativadas ao conectar as APIs.",
      });
      onClose();
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      size="lg"
      title="Vender no Market"
      description="Anuncie um produto permitido pelo servidor. A publicação real depende da validação do item no jogo."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select id="category" {...register("category")}>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {marketCategoryLabels[c]}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="title">Produto</Label>
            <Input id="title" placeholder="Ex.: Lâmina do Crepúsculo" {...register("title")} />
            <FieldError message={errors.title?.message} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="quantity">Quantidade</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              {...register("quantity")}
            />
            <FieldError message={errors.quantity?.message} />
          </div>
          <div>
            <Label htmlFor="price">Preço (R$)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min={1}
              {...register("price")}
            />
            <FieldError message={errors.price?.message} />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            placeholder="Descreva atributos, nível, detalhes relevantes…"
            {...register("description")}
          />
          <FieldError message={errors.description?.message} />
        </div>

        {/* Resumo de taxas */}
        <div className="border border-border bg-bg/40 p-4 clip-chamfer-sm">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
            <Info className="h-3.5 w-3.5" /> Estimativa (taxa de {Math.round(PLATFORM_FEE_RATE * 100)}%)
          </p>
          <dl className="space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Preço do anúncio</dt>
              <dd className="text-ink">{formatBRL(price)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Taxa da plataforma</dt>
              <dd className="text-ink">− {formatBRL(fee)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-1 font-semibold">
              <dt className="text-ink">Valor líquido estimado</dt>
              <dd className="text-emerald-300">{formatBRL(net)}</dd>
            </div>
          </dl>
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <Checkbox
            checked={!!confirmItem}
            onCheckedChange={(v) => setValue("confirmItem", v as true, { shouldValidate: true })}
          />
          <span className="text-xs text-muted">
            Confirmo que possuo este item na minha conta e que ele pode ser
            comercializado conforme as regras do servidor.
          </span>
        </label>
        <FieldError message={errors.confirmItem?.message} />

        <label className="flex cursor-pointer items-start gap-3">
          <Checkbox
            checked={!!acceptTerms}
            onCheckedChange={(v) => setValue("acceptTerms", v as true, { shouldValidate: true })}
          />
          <span className="text-xs text-muted">
            Li e aceito os termos do Market e a política de intermediação.
          </span>
        </label>
        <FieldError message={errors.acceptTerms?.message} />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Publicando…" : "Publicar anúncio"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
