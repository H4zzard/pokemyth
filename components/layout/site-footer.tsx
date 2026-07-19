import Link from "next/link";
import { Logo } from "./logo";
import { SocialLinks } from "./social-links";
import { footerNav } from "@/lib/config/navigation";
import { siteConfig, legalNotice } from "@/lib/config/site";
import { serverStatus } from "@/lib/data/server-status";
import { OnlineDot } from "@/components/shared/badges";

export function SiteFooter() {
  const year = 2026; // TODO: usar ano dinâmico no build/CI se desejado.

  return (
    <footer className="relative mt-24 border-t border-border bg-bg-soft/60">
      <div className="divider-arcane" />
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Coluna principal */}
          <div className="lg:col-span-4">
            <Logo width={170} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.name} é um mundo em constante evolução, criado para
              jogadores que valorizam exploração, progressão, economia e
              comunidade.
            </p>
            <div className="mt-5 inline-flex items-center gap-3 border border-border px-3 py-1.5 clip-chamfer-sm">
              <OnlineDot online={serverStatus.online} />
              <span className="text-xs text-muted">
                {serverStatus.worldName} · {serverStatus.version}
              </span>
            </div>
          </div>

          {/* Navegação */}
          <div className="lg:col-span-2">
            <FooterColumn title="Navegação" items={footerNav.navegacao} />
          </div>

          {/* Conta e suporte */}
          <div className="lg:col-span-3">
            <FooterColumn title="Conta e suporte" items={footerNav.conta} />
          </div>

          {/* Redes sociais */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
              Comunidade
            </h3>
            <p className="mt-4 text-sm text-muted">
              Entre no nosso Discord e participe da construção do mundo de PMO.
            </p>
            <SocialLinks className="mt-4" />
          </div>
        </div>

        {/* Aviso de projeto independente (configurável) */}
        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-muted/70">
          {legalNotice.independentProject}
        </p>
      </div>

      {/* Rodapé inferior */}
      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-muted">
            © {year} {legalNotice.copyrightHolder}. Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {footerNav.legal.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-xs text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
