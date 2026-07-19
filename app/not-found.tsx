import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-6 text-center">
      <div className="absolute inset-0 -z-10 bg-arcane-radial opacity-60" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-grid opacity-20" aria-hidden />
      <Logo width={180} />
      <p className="mt-10 font-display text-7xl font-bold text-arcane-gradient">404</p>
      <h1 className="heading-display mt-2 text-2xl">Página não encontrada</h1>
      <p className="mt-2 max-w-md text-sm text-muted">
        Esta região ainda não foi mapeada. Talvez você tenha se perdido em uma
        caverna de éter…
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/">
          <Button>Voltar ao início</Button>
        </Link>
        <Link href="/pokepedia">
          <Button variant="outline">Abrir Pokepedia</Button>
        </Link>
      </div>
    </main>
  );
}
