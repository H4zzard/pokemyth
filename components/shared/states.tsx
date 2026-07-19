import { cn } from "@/lib/utils";
import { PackageOpen, TriangleAlert } from "lucide-react";

export function LoadingSkeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton clip-chamfer-sm", className)} />;
}

export function CardSkeleton() {
  return (
    <div className="panel p-4">
      <LoadingSkeleton className="aspect-square w-full" />
      <LoadingSkeleton className="mt-4 h-4 w-3/4" />
      <LoadingSkeleton className="mt-2 h-3 w-1/2" />
      <LoadingSkeleton className="mt-4 h-9 w-full" />
    </div>
  );
}

export function EmptyState({
  title,
  description,
  icon: Icon = PackageOpen,
  action,
  className,
}: {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "panel flex flex-col items-center justify-center px-6 py-16 text-center",
        className
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-magenta/30 bg-magenta/10">
        <Icon className="h-7 w-7 text-magenta" />
      </div>
      <h3 className="heading-display text-lg">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ErrorState({
  title = "Algo deu errado",
  description = "Integração com servidor pendente.",
  action,
  className,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "panel flex flex-col items-center justify-center border-destructive/30 px-6 py-16 text-center",
        className
      )}
      role="alert"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-destructive/40 bg-destructive/10">
        <TriangleAlert className="h-7 w-7 text-destructive" />
      </div>
      <h3 className="heading-display text-lg">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
