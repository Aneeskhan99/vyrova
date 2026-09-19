"use client";

/**
 * The pair of buttons under the closing CTA, plus the project brief
 * dialog they open. Client-only and below the fold, so nothing here
 * reaches the hero bundle.
 *
 * Delivery is endpoint-agnostic: the form POSTs JSON to
 * NEXT_PUBLIC_CONTACT_ENDPOINT (Web3Forms, a Cloudflare Worker in front
 * of Mailtrap, anything that takes JSON). With no endpoint configured
 * it falls back to opening the visitor's mail client with the whole
 * brief pre-filled, so the form is never a dead end.
 */

import { useCallback, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Check, Copy, Mail, X } from "lucide-react";
import { contact } from "@/content/site/contact";

const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";
const ACCESS_KEY = process.env.NEXT_PUBLIC_CONTACT_KEY ?? "";

type Values = {
  name: string;
  email: string;
  company: string;
  kind: string;
  brief: string;
  timeline: string;
  budget: string;
};

type Errors = Partial<Record<"name" | "email" | "brief", string>>;

const EMPTY: Values = {
  name: "",
  email: "",
  company: "",
  kind: contact.form.kinds[0],
  brief: "",
  timeline: contact.form.timelines[0],
  budget: contact.form.budgets[4],
};

function mailtoFor(values: Values) {
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.company ? `Company: ${values.company}` : "",
    `Needs: ${values.kind}`,
    `Timeline: ${values.timeline}`,
    `Budget: ${values.budget}`,
    "",
    "About the project:",
    values.brief,
  ]
    .filter(Boolean)
    .join("\n");
  return `mailto:${contact.email}?subject=${encodeURIComponent(
    `New project: ${values.name}${values.company ? ` (${values.company})` : ""}`,
  )}&body=${encodeURIComponent(body)}`;
}

export function ProjectCta() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    void navigator.clipboard?.writeText(contact.email).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <>
      <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:flex-wrap sm:gap-4">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-cyan px-4 py-3 text-[0.8125rem] font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5 sm:gap-2 sm:px-7 sm:py-4 sm:text-base"
        >
          {contact.buttons.primary}
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>

        <div className="flex shrink-0 items-center rounded-full border border-line bg-surface">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-1.5 rounded-l-full px-3.5 py-3 text-[0.8125rem] font-semibold transition-colors hover:text-accent sm:gap-2 sm:px-6 sm:py-4 sm:text-base"
          >
            <Mail aria-hidden="true" className="size-4" />
            {contact.buttons.secondary}
          </a>
          <span aria-hidden="true" className="h-6 w-px bg-line" />
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? contact.buttons.copied : contact.buttons.copy}
            className="inline-flex items-center gap-2 rounded-r-full px-3 py-3 text-xs font-medium text-muted transition-colors hover:text-ink sm:px-5 sm:py-4 sm:text-sm"
          >
            {copied ? (
              <>
                <Check aria-hidden="true" className="size-4 text-accent" />
                {contact.buttons.copied}
              </>
            ) : (
              <Copy aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>
      </div>

      {open ? <ProjectDialog onClose={() => setOpen(false)} /> : null}
    </>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

function ProjectDialog({ onClose }: { onClose: () => void }) {
  const f = contact.form;
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    opener.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLInputElement>("input, textarea")?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [onClose]);

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const cleared: Errors = { ...prev };
      delete cleared[key as keyof Errors];
      return cleared;
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const next: Errors = {};
    if (!values.name.trim()) next.name = f.required;
    if (!values.email.trim()) next.email = f.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) next.email = f.invalidEmail;
    if (!values.brief.trim()) next.brief = f.required;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Honeypot: a real visitor never sees this field.
    const trap = new FormData(event.currentTarget).get("website");
    if (typeof trap === "string" && trap.length > 0) {
      setStatus("sent");
      return;
    }

    if (!ENDPOINT) {
      window.location.href = mailtoFor(values);
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...(ACCESS_KEY ? { access_key: ACCESS_KEY } : {}),
          subject: `New project: ${values.name}${values.company ? ` (${values.company})` : ""}`,
          from_name: values.name,
          ...values,
        }),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return createPortal(
    <div className="fw-modal fixed inset-0 z-[80] flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label={f.close}
        onClick={onClose}
        className="fw-modal-veil fixed inset-0 cursor-default bg-ink/45 backdrop-blur-sm"
      />

      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="fw-modal-panel relative my-auto w-full max-w-[40rem] rounded-t-tile border border-line bg-ground p-6 shadow-lift sm:rounded-tile sm:p-9"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={f.close}
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
        >
          <X aria-hidden="true" className="size-4" />
        </button>

        {status === "sent" ? (
          <div className="py-6 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent-soft">
              <Check aria-hidden="true" className="size-6 text-accent" />
            </span>
            <h2 id={titleId} className="mt-5 text-2xl font-bold tracking-[-0.02em]">
              {f.successTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-[42ch] leading-relaxed text-muted">{f.successBody}</p>
            {!ENDPOINT ? <p className="mt-3 text-sm text-muted">{f.mailtoNote}</p> : null}
            <button
              type="button"
              onClick={onClose}
              className="mt-7 inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-surface"
            >
              {f.successClose}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">{f.eyebrow}</p>
            <h2 id={titleId} className="mt-2 pr-10 text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight tracking-[-0.03em]">
              {f.title}
            </h2>
            <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">{f.intro}</p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field label={f.name.label} error={errors.name}>
                <input
                  required
                  value={values.name}
                  onChange={(event) => set("name", event.target.value)}
                  placeholder={f.name.placeholder}
                  autoComplete="name"
                  className="fw-input"
                />
              </Field>
              <Field label={f.email.label} error={errors.email}>
                <input
                  required
                  type="email"
                  value={values.email}
                  onChange={(event) => set("email", event.target.value)}
                  placeholder={f.email.placeholder}
                  autoComplete="email"
                  className="fw-input"
                />
              </Field>
              <Field label={f.company.label} hint={f.company.hint}>
                <input
                  value={values.company}
                  onChange={(event) => set("company", event.target.value)}
                  placeholder={f.company.placeholder}
                  autoComplete="organization"
                  className="fw-input"
                />
              </Field>
              <Field label={f.kind.label}>
                <select
                  value={values.kind}
                  onChange={(event) => set("kind", event.target.value)}
                  className="fw-input"
                >
                  {f.kinds.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label={f.brief.label} error={errors.brief}>
                  <textarea
                    required
                    rows={4}
                    value={values.brief}
                    onChange={(event) => set("brief", event.target.value)}
                    placeholder={f.brief.placeholder}
                    className="fw-input resize-y"
                  />
                </Field>
              </div>
              <Field label={f.timeline.label}>
                <select
                  value={values.timeline}
                  onChange={(event) => set("timeline", event.target.value)}
                  className="fw-input"
                >
                  {f.timelines.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
              <Field label={f.budget.label} hint={f.budget.hint}>
                <select
                  value={values.budget}
                  onChange={(event) => set("budget", event.target.value)}
                  className="fw-input"
                >
                  {f.budgets.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </Field>
            </div>

            <div aria-hidden="true" className="absolute left-[-9999px] top-0">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {status === "error" ? (
              <p className="mt-6 rounded-card border border-line bg-surface p-4 text-sm leading-relaxed text-muted">
                <span className="font-semibold text-ink">{f.errorTitle}</span> {f.errorBody}{" "}
                <a href={mailtoFor(values)} className="font-semibold text-accent underline underline-offset-4">
                  {contact.email}
                </a>
              </p>
            ) : null}

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-cyan px-7 py-4 text-base font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-70"
              >
                {status === "sending" ? f.sending : f.submit}
                {status === "sending" ? (
                  <span aria-hidden="true" className="fw-spinner size-4 rounded-full border-2 border-ink/25 border-t-ink" />
                ) : (
                  <ArrowRight aria-hidden="true" className="size-4" />
                )}
              </button>
              <a href={`mailto:${contact.email}`} className="text-sm font-medium text-muted transition-colors hover:text-ink">
                {contact.email}
              </a>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline gap-2 text-sm font-medium">
        {label}
        {hint ? <span className="text-xs font-normal text-muted">{hint}</span> : null}
      </span>
      <span className="mt-2 block">{children}</span>
      {error ? <span className="mt-1.5 block text-xs text-accent">{error}</span> : null}
    </label>
  );
}
