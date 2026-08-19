"use client";

import { useState } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

/**
 * Formulaire de demande de devis.
 *
 * Aucun backend n'est requis par défaut : la demande est ouverte dans le
 * client de messagerie du visiteur. Pour recevoir les demandes directement
 * (Formspree, Getform, API interne...), renseignez la variable
 * NEXT_PUBLIC_CONTACT_ENDPOINT dans .env.local : le formulaire enverra alors
 * un POST JSON vers cette URL.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Piège à robots : rempli uniquement par les automates.
    if (data.website) return;

    if (!ENDPOINT) {
      const body = [
        `Nom : ${data.name}`,
        `Email : ${data.email}`,
        `Téléphone : ${data.phone}`,
        `Ville : ${data.city}`,
        `Projet : ${data.subject}`,
        `Budget estimé : ${data.budget || "non précisé"}`,
        "",
        data.message,
      ].join("\n");

      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `Demande de devis — ${data.subject}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card flex flex-col items-center gap-4 py-14 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-sm bg-accent-soft text-accent">
          <CheckIcon width={28} height={28} strokeWidth={2.2} />
        </span>
        <h2 className="h3">Demande transmise</h2>
        <p className="max-w-sm muted">
          Merci ! Nous revenons vers vous sous 48 heures ouvrées avec une première estimation et
          une proposition de visite technique.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-secondary">
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom et prénom" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Téléphone" name="phone" type="tel" required autoComplete="tel" />
        <Field label="Ville / région" name="city" autoComplete="address-level2" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="subject" className="text-sm font-medium">
            Votre projet <span className="text-sun">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            defaultValue=""
            className="mt-1.5 w-full rounded border bg-transparent px-3.5 py-2.5 text-sm"
          >
            <option value="" disabled>
              Sélectionnez un service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.short}>
                {s.short}
              </option>
            ))}
            <option value="Autre demande">Autre demande</option>
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="text-sm font-medium">
            Budget envisagé
          </label>
          <select
            id="budget"
            name="budget"
            defaultValue=""
            className="mt-1.5 w-full rounded border bg-transparent px-3.5 py-2.5 text-sm"
          >
            <option value="">Je ne sais pas encore</option>
            <option value="< 5 M Ar">Moins de 5 millions Ar</option>
            <option value="5–15 M Ar">5 à 15 millions Ar</option>
            <option value="15–40 M Ar">15 à 40 millions Ar</option>
            <option value="> 40 M Ar">Plus de 40 millions Ar</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Décrivez votre besoin <span className="text-sun">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Surface de toiture, appareils à alimenter, coupures subies, échéance souhaitée..."
          className="mt-1.5 w-full rounded border bg-transparent px-3.5 py-2.5 text-sm"
        />
      </div>

      {/* Champ leurre anti-spam, masqué aux humains et aux lecteurs d'écran. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded border border-red-500/40 bg-red-500/10 p-3 text-sm">
          L&rsquo;envoi a échoué. Écrivez-nous directement à{" "}
          <a href={`mailto:${site.email}`} className="link-underline">
            {site.email}
          </a>
          .
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
        <ArrowRightIcon width={16} height={16} />
      </button>

      <p className="text-xs muted">
        Vos données servent uniquement à traiter votre demande. Aucune transmission à des tiers.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span className="text-sun">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5 w-full rounded border bg-transparent px-3.5 py-2.5 text-sm"
      />
    </div>
  );
}
