import React from "react";

export type Topic = {
  slug: string;
  title: string;
  description: string;
};

export const topics: Topic[] = [
  { slug: "getting-started", title: "Getting Started", description: "Set up the project, environments, and first deploy in under 30 minutes." },
  { slug: "architecture-overview", title: "Architecture Overview", description: "High-level system design, boundaries, and data flow." },
  { slug: "api-quickstart", title: "API Quickstart", description: "Authenticate, make your first API call, and handle common responses." },
  { slug: "auth-and-sso", title: "Auth & SSO", description: "Configure OAuth2/OIDC, SAML, and session best practices." },
  { slug: "webhooks", title: "Webhooks", description: "Subscribe to events, secure endpoints, and retry strategies." },
  { slug: "rate-limiting", title: "Rate Limiting", description: "Prevent abuse while keeping your API reliable for all consumers." },
  { slug: "error-handling", title: "Error Handling", description: "Patterns for surfacing actionable errors to users and logs." },
  { slug: "observability", title: "Observability", description: "Metrics, logs, and traces that answer 'Is it working?'." },
  { slug: "logging", title: "Logging", description: "Structured logs, log levels, and PII redaction." },
  { slug: "monitoring-alerts", title: "Monitoring & Alerts", description: "Detect incidents early with SLOs and alert policies." },
  { slug: "security-hardening", title: "Security Hardening", description: "Secure defaults, secrets, patching, and threat modeling." },
  { slug: "gdpr-data-retention", title: "GDPR & Data Retention", description: "Retention schedules, DSRs, and data classification." },
  { slug: "backup-disaster-recovery", title: "Backup & Disaster Recovery", description: "Backups you can actually restore and DR runbooks." },
  { slug: "performance-tuning", title: "Performance Tuning", description: "Profiling, bottlenecks, and practical optimizations." },
  { slug: "caching-strategies", title: "Caching Strategies", description: "HTTP caching, CDN, application caches, and invalidation." },
  { slug: "database-migrations", title: "Database Migrations", description: "Zero-downtime migrations and rollback patterns." },
  { slug: "testing-strategy", title: "Testing Strategy", description: "Unit, integration, E2E, and contract testing pyramid." },
  { slug: "ci-cd-pipeline", title: "CI/CD Pipeline", description: "Build, test, and deploy with safety and speed." },
  { slug: "feature-flags", title: "Feature Flags", description: "Progressive delivery, kill switches, and dark launches." },
  { slug: "accessibility", title: "Accessibility (a11y)", description: "WCAG 2.2 practices for inclusive experiences." },
  { slug: "internationalization", title: "Internationalization (i18n)", description: "Localize UI, dates, and currency at scale." },
  { slug: "seo-basics", title: "SEO Basics", description: "Indexing, metadata, sitemaps, and Core Web Vitals." },
  { slug: "content-delivery", title: "Content Delivery & CDN", description: "Global cache, edge rules, and bandwidth savings." },
  { slug: "mobile-ux", title: "Mobile UX Patterns", description: "Responsive layout, gestures, and lightweight assets." },
  { slug: "email-deliverability", title: "Email Deliverability", description: "SPF/DKIM/DMARC, warm-up, and spam minimization." },
  { slug: "billing-subscriptions", title: "Billing & Subscriptions", description: "Pricing, proration, taxes, and dunning." },
  { slug: "support-slas", title: "Support & SLAs", description: "Case triage, escalation, and response guarantees." },
  { slug: "changelog-release-notes", title: "Changelog & Release Notes", description: "Communicate changes clearly without noise." },
  { slug: "roadmap-rfcs", title: "Roadmap & RFCs", description: "Align stakeholders and make decisions visibly." }
];

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <div className="prose prose-invert max-w-none text-white/90">{children}</div>
  </section>
);

export const content: Record<string, React.ReactNode> = {
  "getting-started": (
    <div>
      <Section title="What you'll achieve">
        <ul>
          <li>Provision environments: development, staging, production.</li>
          <li>Configure environment variables and secrets management.</li>
          <li>Deploy the first build via CI with automated checks.</li>
        </ul>
      </Section>
      <Section title="Prerequisites">
        <ul>
          <li>Node 18+, Git, a cloud account (e.g., Vercel/Netlify/AWS).</li>
          <li>Access to a managed database (e.g., Postgres).</li>
          <li>Organization SSO (if required) and access to secrets vault.</li>
        </ul>
      </Section>
      <Section title="Steps">
        <ol>
          <li>Fork the repository and create branches per feature.</li>
          <li>Run local dev: <code>pnpm i && pnpm dev</code> (or npm/yarn).</li>
          <li>Create a <code>.env</code> with API keys and DB connection strings.</li>
          <li>Push to the main branch to trigger CI build & preview deploy.</li>
        </ol>
      </Section>
      <Section title="Validation">
        <ul>
          <li>Health endpoint responds 200.</li>
          <li>Smoke tests green on CI.</li>
          <li>Staging URL is accessible and gated by basic auth.</li>
        </ul>
      </Section>
    </div>
  ),
  "architecture-overview": (
    <div>
      <Section title="System diagram">
        <p>Monorepo with a Next.js frontend, BFF (API routes), and a Postgres DB. Async workers handle webhooks and long-running jobs via a queue (e.g., SQS/Redis). CDN caches static assets at the edge.</p>
      </Section>
      <Section title="Key boundaries">
        <ul>
          <li>Frontend ↔ BFF: typed contracts, rate limits, and auth middleware.</li>
          <li>BFF ↔ DB: parameterized queries and migrations.</li>
          <li>BFF ↔ 3rd parties: circuit breakers and retries with jitter.</li>
        </ul>
      </Section>
      <Section title="Non-functional requirements">
        <ul>
          <li>Availability 99.9%, RTO 30m, RPO 15m.</li>
          <li>{'Latency p95 < 300ms for key flows.'}</li>
          <li>Cost budget tracked monthly with alerts.</li>
        </ul>
      </Section>
    </div>
  ),
  "api-quickstart": (
    <div>
      <Section title="Auth">
        <pre><code>{`curl -X POST https://api.example.com/v1/token \\
  -u CLIENT_ID:CLIENT_SECRET \\
  -d grant_type=client_credentials`}</code></pre>
      </Section>
      <Section title="Your first request">
        <pre><code>{`curl https://api.example.com/v1/customers \\
  -H 'Authorization: Bearer <token>'`}</code></pre>
      </Section>
      <Section title="Common responses">
        <ul>
          <li>200 OK with data; use pagination via <code>next_cursor</code>.</li>
          <li>401 if token expired; refresh using the token endpoint.</li>
          <li>429 if rate-limited; back off with exponential jitter.</li>
        </ul>
      </Section>
    </div>
  ),
  "auth-and-sso": (
    <div>
      <Section title="Options">
        <ul>
          <li>OAuth2/OIDC for customer logins.</li>
          <li>SAML for enterprise SSO.</li>
          <li>Session tokens with same-site and HTTP-only cookies.</li>
        </ul>
      </Section>
      <Section title="Best practices">
        <ul>
          <li>Short-lived tokens; rotate refresh tokens.</li>
          <li>Enforce MFA and device checks for admins.</li>
          <li>Use PKCE for public clients.</li>
        </ul>
      </Section>
    </div>
  ),
  "webhooks": (
    <div>
      <Section title="Security">
        <ul>
          <li>Verify signatures using HMAC with a shared secret.</li>
          <li>Respond with 2xx quickly; process async.</li>
          <li>Retry with backoff and idempotency keys.</li>
        </ul>
      </Section>
      <Section title="Local testing">
        <p>Tunnel webhooks to localhost via tools like ngrok or cloudflared. Log full request context (without secrets) for debuggability.</p>
      </Section>
    </div>
  ),
  "rate-limiting": (
    <div>
      <Section title="Policies">
        <ul>
          <li>Global per API key and per-IP quotas.</li>
          <li>Burst limits with sliding windows.</li>
          <li>Headers: <code>X-RateLimit-Remaining</code>, <code>Retry-After</code>.</li>
        </ul>
      </Section>
      <Section title="Abuse mitigations">
        <p>Detect anomalies by user-agent and geo. Combine with WAF rules for L7 protection.</p>
      </Section>
    </div>
  ),
  "error-handling": (
    <div>
      <Section title="Principles">
        <ul>
          <li>Fail fast; return typed, actionable errors.</li>
          <li>Never expose internal stack traces to end users.</li>
          <li>Map external errors to domain-specific codes.</li>
        </ul>
      </Section>
      <Section title="User messages">
        <p>Give next steps, not just codes: “Payment failed. Please update your card or contact support.”</p>
      </Section>
    </div>
  ),
  "observability": (
    <div>
      <Section title="The three pillars">
        <ul>
          <li>Metrics: RED/USE dashboards with SLOs.</li>
          <li>Logs: structured and queryable with sampling.</li>
          <li>Traces: span context across services.</li>
        </ul>
      </Section>
      <Section title="KPIs">
        <ul>
          <li>Uptime, error rate, latency distributions.</li>
          <li>Customer-impacting incidents and MTTR.</li>
        </ul>
      </Section>
    </div>
  ),
  "logging": (
    <div>
      <Section title="Guidelines">
        <ul>
          <li>Use JSON logs with consistent keys.</li>
          <li>Mask PII and secrets at source.</li>
          <li>Log IDs for correlation across systems.</li>
        </ul>
      </Section>
      <Section title="Retention">
        <p>Set tiered retention and archive to cold storage to control cost.</p>
      </Section>
    </div>
  ),
  "monitoring-alerts": (
    <div>
      <Section title="SLOs">
        <p>Define availability and latency targets per critical path (e.g., checkout p95 &lt; 300ms, error rate &lt; 0.5%).</p>
      </Section>
      <Section title="Alert policy">
        <ul>
          <li>Page only on customer impact; everything else as tickets.</li>
          <li>Use multi-window burn rates for SLO alerts.</li>
        </ul>
      </Section>
    </div>
  ),
  "security-hardening": (
    <div>
      <Section title="Checklist">
        <ul>
          <li>Least-privilege IAM and short-lived credentials.</li>
          <li>Dependency scanning and automated patching.</li>
          <li>Secure headers: CSP, HSTS, XFO, XSS-Protection.</li>
        </ul>
      </Section>
      <Section title="Threat modeling">
        <p>Run lightweight STRIDE reviews for new high-risk features and document assumptions.</p>
      </Section>
    </div>
  ),
  "gdpr-data-retention": (
    <div>
      <Section title="Data lifecycle">
        <ul>
          <li>Classify data and map processors/subprocessors.</li>
          <li>Automate deletion after retention windows.</li>
          <li>Implement DSR workflows (access, delete, export).</li>
        </ul>
      </Section>
      <Section title="Lawful basis">
        <p>Track consent and legitimate interest per purpose with audit trails.</p>
      </Section>
    </div>
  ),
  "backup-disaster-recovery": (
    <div>
      <Section title="Backups">
        <ul>
          <li>Nightly snapshots with PITR, encrypted at rest.</li>
          <li>Store in a separate account/region.</li>
          <li>Test restores monthly with documented RTO/RPO.</li>
        </ul>
      </Section>
      <Section title="DR runbook">
        <p>Document comms plan, responsibilities, and failover steps. Run game-days quarterly.</p>
      </Section>
    </div>
  ),
  "performance-tuning": (
    <div>
      <Section title="Profiling">
        <ul>
          <li>Identify p95 bottlenecks via APM.</li>
          <li>Batch external calls and use keep-alive connections.</li>
          <li>Avoid N+1 DB queries with proper joins/loader patterns.</li>
        </ul>
      </Section>
      <Section title="Front-end">
        <ul>
          <li>Code-split, prefetch critical routes, optimize images.</li>
          <li>Use HTTP/2 and compress JSON with gzip/br.</li>
        </ul>
      </Section>
    </div>
  ),
  "caching-strategies": (
    <div>
      <Section title="Layers">
        <ul>
          <li>Browser: Cache-Control, ETags, and service workers.</li>
          <li>CDN: edge cache with stale-while-revalidate.</li>
          <li>App: Redis/Memory with TTLs and cache keys.</li>
        </ul>
      </Section>
      <Section title="Invalidation">
        <p>Prefer time-based TTLs with background refresh. Avoid manual purges where possible.</p>
      </Section>
    </div>
  ),
  "database-migrations": (
    <div>
      <Section title="Zero-downtime pattern">
        <ol>
          <li>Additive change → dual write → backfill → switch reads → remove old.</li>
          <li>Gate risky changes behind feature flags.</li>
          <li>Always have a rollback plan and tested backups.</li>
        </ol>
      </Section>
    </div>
  ),
  "testing-strategy": (
    <div>
      <Section title="Test pyramid">
        <ul>
          <li>70% unit, 20% integration, 10% E2E as a heuristic.</li>
          <li>Contract tests to validate external integrations.</li>
          <li>Use CDCs for microservices to avoid tight coupling.</li>
        </ul>
      </Section>
      <Section title="Tooling">
        <p>Parallelize tests, cache dependencies, and run flake detection with retries.</p>
      </Section>
    </div>
  ),
  "ci-cd-pipeline": (
    <div>
      <Section title="Pipeline stages">
        <ol>
          <li>Build → Unit tests → Integration tests → Security scans.</li>
          <li>Deploy to staging → Smoke tests → Manual approval (if needed).</li>
          <li>Prod deploy with canary or blue/green + automatic rollback.</li>
        </ol>
      </Section>
      <Section title="Secrets">
        <p>Use managed secrets, never commit keys. Rotate on schedule and on breach suspicion.</p>
      </Section>
    </div>
  ),
  "feature-flags": (
    <div>
      <Section title="Use cases">
        <ul>
          <li>Gradual rollouts by cohort or percentage.</li>
          <li>Kill switches for rapid disable on incidents.</li>
          <li>A/B experiments with guardrails.</li>
        </ul>
      </Section>
      <Section title="Governance">
        <p>Expire stale flags regularly and document owner/intent.</p>
      </Section>
    </div>
  ),
  "accessibility": (
    <div>
      <Section title="WCAG checklist">
        <ul>
          <li>Keyboard navigable and visible focus states.</li>
          <li>Color contrast ≥ 4.5:1 for body text.</li>
          <li>ARIA labels for interactive controls.</li>
        </ul>
      </Section>
      <Section title="Testing">
        <p>Run automated checks and manual screen reader tests on key flows.</p>
      </Section>
    </div>
  ),
  "internationalization": (
    <div>
      <Section title="Localization">
        <ul>
          <li>Externalize strings; avoid concatenation for grammar correctness.</li>
          <li>Handle dates, numbers, and currency with locale-aware APIs.</li>
          <li>Right-to-left support via logical CSS properties.</li>
        </ul>
      </Section>
    </div>
  ),
  "seo-basics": (
    <div>
      <Section title="Essentials">
        <ul>
          <li>Unique titles and meta descriptions per page.</li>
          <li>XML sitemap and robots.txt tuned for public pages.</li>
          <li>Core Web Vitals: LCP, CLS, INP budgets.</li>
        </ul>
      </Section>
    </div>
  ),
  "content-delivery": (
    <div>
      <Section title="Edge caching">
        <ul>
          <li>Static assets with immutable cache and content hashing.</li>
          <li>Use image optimization and AVIF/WebP formats.</li>
        </ul>
      </Section>
      <Section title="Bandwidth control">
        <p>Prefer streaming for large payloads; paginate and compress JSON.</p>
      </Section>
    </div>
  ),
  "mobile-ux": (
    <div>
      <Section title="Responsive principles">
        <ul>
          <li>Mobile-first layout; avoid horizontal scroll.</li>
          <li>Tap targets ≥ 44px and proper spacing.</li>
          <li>Offline-friendly where feasible.</li>
        </ul>
      </Section>
    </div>
  ),
  "email-deliverability": (
    <div>
      <Section title="Foundation">
        <ul>
          <li>Set up SPF, DKIM, and DMARC with alignment.</li>
          <li>Warm up sending IP/domain gradually.</li>
          <li>Honor unsubscribe and list-unsubscribe headers.</li>
        </ul>
      </Section>
      <Section title="Content">
        <p>Use plain text fallbacks and avoid spam trigger words; keep images lightweight.</p>
      </Section>
    </div>
  ),
  "billing-subscriptions": (
    <div>
      <Section title="Pricing & tax">
        <ul>
          <li>Transparent pricing pages with clear limits.</li>
          <li>Handle VAT/GST and collect tax IDs where required.</li>
          <li>Pro-rate upgrades/downgrades and issue credit notes.</li>
        </ul>
      </Section>
      <Section title="Dunning">
        <p>Automate card retries with grace periods and in-app nudges before churn.</p>
      </Section>
    </div>
  ),
  "support-slas": (
    <div>
      <Section title="SLAs">
        <ul>
          <li>Tiered response targets (e.g., P1 1h, P2 4h).</li>
          <li>Clear escalation paths and on-call rotations.</li>
          <li>Post-incident RCAs shared with customers.</li>
        </ul>
      </Section>
      <Section title="Tooling">
        <p>Use a shared inbox with templates and tagging for analytics.</p>
      </Section>
    </div>
  ),
  "changelog-release-notes": (
    <div>
      <Section title="Principles">
        <ul>
          <li>Summarize impact first; link to details.</li>
          <li>Group by Added/Changed/Fixed/Deprecated.</li>
          <li>Provide upgrade guides for breaking changes.</li>
        </ul>
      </Section>
    </div>
  ),
  "roadmap-rfcs": (
    <div>
      <Section title="Process">
        <ol>
          <li>Open an RFC with problem statement and options.</li>
          <li>Stakeholder review and timeboxed discussion.</li>
          <li>Decision record with chosen approach and owners.</li>
        </ol>
      </Section>
      <Section title="Visibility">
        <p>Publish a public roadmap with themes and rough timelines to set expectations.</p>
      </Section>
    </div>
  ),
};
