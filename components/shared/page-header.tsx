import { SectionHeading } from "./section-heading";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border pb-10 pt-32">
      <div className="absolute inset-0 -z-10 bg-arcane-radial opacity-70" aria-hidden />
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-grid opacity-30" aria-hidden />
      <div className="container">
        <SectionHeading
          as="h1"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
