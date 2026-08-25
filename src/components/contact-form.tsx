"use client";

import { useState } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

/**
 * Formulaire de demande de devis.
 *
 * Le site est un ensemble de fichiers statiques : il n'a aucun serveur pour
 * envoyer un courriel. La demande part donc vers un service de relais, qui la
 * transmet à l'adresse de contact.
 *
 * Par défaut : FormSubmit, choisi parce qu'il ne demande aucun compte — la
 * première demande déclenche un courriel d'activation à l'adresse visée, et
 * tout arrive ensuite directement. L'adresse n'est pas plus exposée qu'ailleurs :
 * elle figure déjà en clair sur la page de contact.
 *
 * Pour passer à un autre service (Formspree, Getform, Web3Forms, une route
 * interne…), il suffit de renseigner NEXT_PUBLIC_CONTACT_ENDPOINT : n'importe
 * quelle URL acceptant un POST JSON convient.
 */
const ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || `https://formsubmit.co/ajax/${site.email}`;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Piège à robots : rempli uniquement par les automates.
    if (data.website) return;

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        // Les clés servent d'intitulés dans le courriel reçu : elles sont donc
        // écrites en toutes lettres. Les champs préfixés d'un souligné sont des
        // consignes pour le relais, jamais du contenu.
        body: JSON.stringify({
          _subject: `Demande de devis — ${data.subject}`,
          _template: "table",
          _captcha: "false",
          _replyto: data.email,
          Nom: data.name,
          Email: data.email,
          Téléphone: data.phone,
          Ville: data.city || "non précisée",
          Projet: data.subject,
          Échéance: data.deadline || "non précisée",
          Message: data.message,
        }),
      });

      // Tant que l'adresse de réception n'est pas confirmée, le relais répond
      // « success: false » avec un code 200 : afficher « transmise » ici
      // laisserait croire à un envoi qui n'a pas eu lieu.
      const reponse = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
      const accepte = res.ok && String(reponse?.success ?? "true") === "true";
      if (!accepte) throw new Error("relais");

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
          Merci ! Nous revenons vers vous rapidement pour convenir d&rsquo;une descente technique
          sur votre site.
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
          <label htmlFor="deadline" className="text-sm font-medium">
            Échéance souhaitée
          </label>
          <select
            id="deadline"
            name="deadline"
            defaultValue=""
            className="mt-1.5 w-full rounded border bg-transparent px-3.5 py-2.5 text-sm"
          >
            <option value="">Pas de date précise</option>
            <option value="Dès que possible">Dès que possible</option>
            <option value="Sous 1 à 3 mois">Sous 1 à 3 mois</option>
            <option value="Sous 3 à 6 mois">Sous 3 à 6 mois</option>
            <option value="Je me renseigne">Je me renseigne pour l&rsquo;instant</option>
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
