import { CheckCircle2, Clock, CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";

export type EvidenceStatus = "VERIFIED" | "IN_PROGRESS" | "FUTURE";

const statusConfig: Record<
  EvidenceStatus,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  VERIFIED: {
    label: "Verified",
    icon: CheckCircle2,
    className: "text-green-400 border-green-500/30 bg-green-500/10",
  },
  IN_PROGRESS: {
    label: "In Progress",
    icon: Clock,
    className: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  FUTURE: {
    label: "Planned",
    icon: CircleDashed,
    className: "text-muted-foreground border-border bg-muted/30",
  },
};

interface EvidenceBadgeProps {
  status: EvidenceStatus;
  className?: string;
}

/**
 * Renders the verification status of a claim. Every claim on a case-study
 * page should carry one of these — status is read from content/*.ts, which
 * mirrors docs/EVIDENCE_REGISTRY.md. Never hardcode "Verified" text directly
 * in page copy; route it through this component so status changes are a
 * one-line edit in the content file, not a hunt through JSX.
 */
export const EvidenceBadge = ({ status, className }: EvidenceBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border",
        config.className,
        className,
      )}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
};
