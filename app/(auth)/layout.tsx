import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/layout/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden p-4 sm:p-6">
      {/* Fundo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero/pokemyth-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-bg/85" />
        <div className="absolute inset-0 [box-shadow:inset_0_0_200px_60px_rgba(5,4,12,0.95)]" />
      </div>

      <Link
        href="/"
        className="absolute left-5 top-5 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar ao site
      </Link>

      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo width={190} priority />
        </div>
        <div className="panel border-magenta/20 p-6 shadow-card sm:p-8">
          {children}
        </div>
      </div>
    </main>
  );
}
