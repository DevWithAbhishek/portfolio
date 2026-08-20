import {
  Lock,
  Webhook,
  RotateCcw,
  MapPin,
  ShieldCheck,
  KeyRound,
} from "lucide-react";

// Only concepts with source-level verified evidence. See EVIDENCE_REGISTRY.md.
const conceptsData = [
  {
    icon: Lock,
    concept: "Pessimistic Locking (SELECT FOR UPDATE)",
    where: "Kridha — inventory decrement inside checkout transaction",
    problem:
      "Concurrent buyers checking out the same limited stock must never oversell it.",
    tradeoff:
      "Row lock is held for the full transaction, so contention rises under heavy concurrent checkout on the same product — chosen over optimistic retry because checkout needs to resolve synchronously for UX.",
  },
  {
    icon: Webhook,
    concept: "Idempotent Webhook Processing",
    where: "Kridha — Razorpay webhook receiver",
    problem:
      "Payment providers redeliver webhooks; duplicate delivery must never double-process a payment.",
    tradeoff:
      "Requires always returning 200 even on internal errors (to avoid retry storms), which means failures have to be caught by logging/alerting instead of HTTP status codes.",
  },
  {
    icon: RotateCcw,
    concept: "Refresh Token Family Rotation",
    where: "Kridha and ShelfAPI — session/auth layer",
    problem:
      "Simple token rotation cannot detect theft: if a stolen token is used before the real user refreshes, the attacker's session looks legitimate.",
    tradeoff:
      "Requires tracking a session table per device/login and revoking a whole token family on reuse detection — more storage and complexity than stateless JWTs alone.",
  },
  {
    icon: MapPin,
    concept: "PostGIS Geospatial Search",
    where: "Kridha — radius-based product discovery",
    problem:
      'Hyperlocal marketplace needs accurate "within N meters" search at India scale, not flat-plane approximation.',
    tradeoff:
      "Chosen over MongoDB's $geoWithin because PostGIS uses the WGS-84 ellipsoid (geodesic distance) rather than flat geometry — at the cost of committing to a relational database for what could otherwise be a document store.",
  },
  {
    icon: ShieldCheck,
    concept: "Runtime Validation at the Trust Boundary",
    where: "Kridha and ShelfAPI — every API route",
    problem:
      "TypeScript types are erased at compile time; they cannot catch malformed data arriving over HTTP.",
    tradeoff:
      "Zod schemas duplicate the shape already described by TypeScript types, but that duplication is exactly what makes the boundary safe — one describes intent, the other verifies reality.",
  },
  {
    icon: KeyRound,
    concept: "Ownership-Scoped Authorization",
    where: "Kridha and ShelfAPI — every resource query",
    problem:
      "A logged-in user must never read or modify another user's data by guessing or reusing an ID.",
    tradeoff:
      "Ownership checks are embedded directly in the WHERE clause of every query rather than a separate policy layer — simpler to reason about per-query, but repeats the same check across every route instead of centralizing it.",
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative spotlight">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Core <span className="gradient-text">Concepts</span>
          </h2>
          <p className="section-subtitle">
            Not a technology list — where each concept was actually used, the
            problem it solved, and the trade-off I accepted
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {conceptsData.map((item) => (
            <div
              key={item.concept}
              className="card-glass gradient-border rounded-xl p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base leading-tight">
                    {item.concept}
                  </h3>
                  <p className="text-primary/80 text-xs font-mono mt-1">
                    {item.where}
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  <span className="text-foreground font-medium">Problem: </span>
                  {item.problem}
                </p>
                <p>
                  <span className="text-foreground font-medium">
                    Trade-off:{" "}
                  </span>
                  {item.tradeoff}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
