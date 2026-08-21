"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRightIcon, BatteryIcon, BoltIcon, CloseIcon, PanelIcon, SunIcon } from "@/components/icons";

/* -------------------------------------------------------------------------- */
/*  Hypothèses de calcul                                                       */
/* -------------------------------------------------------------------------- */

/** Heures d'ensoleillement équivalent plein soleil, moyenne malgache. */
const PEAK_SUN_HOURS = 5;
/** Rendement global du système (câbles, onduleur, température, salissure). */
const SYSTEM_EFFICIENCY = 0.75;
/** Part des appareils susceptibles de fonctionner en même temps. */
const SIMULTANEITY = 0.65;
/** Marge de sécurité sur la puissance d'onduleur. */
const INVERTER_MARGIN = 1.3;
/** Profondeur de décharge admissible par technologie de batterie. */
const DOD = { lithium: 0.85, plomb: 0.5 } as const;
/** Tension du parc batterie retenue pour convertir les kWh en Ah. */
const BATTERY_VOLTAGE = 48;

type Appliance = {
  id: number;
  name: string;
  watts: number;
  hours: number;
  qty: number;
};

const PRESETS: { name: string; watts: number; hours: number }[] = [
  { name: "Ampoule LED", watts: 9, hours: 5 },
  { name: "Réfrigérateur", watts: 150, hours: 8 },
  { name: "Congélateur", watts: 200, hours: 8 },
  { name: "Téléviseur", watts: 90, hours: 5 },
  { name: "Ventilateur", watts: 60, hours: 6 },
  { name: "Ordinateur portable", watts: 65, hours: 6 },
  { name: "Box internet", watts: 15, hours: 24 },
  { name: "Pompe à eau", watts: 750, hours: 2 },
  { name: "Fer à repasser", watts: 1000, hours: 0.5 },
  { name: "Climatiseur", watts: 1200, hours: 6 },
];

const DEFAULT_APPLIANCES: Appliance[] = [
  { id: 1, name: "Ampoule LED", watts: 9, hours: 5, qty: 8 },
  { id: 2, name: "Réfrigérateur", watts: 150, hours: 8, qty: 1 },
  { id: 3, name: "Téléviseur", watts: 90, hours: 5, qty: 1 },
  { id: 4, name: "Box internet", watts: 15, hours: 24, qty: 1 },
];

const numberFr = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });
const intFr = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

export function SolarSimulator() {
  const [appliances, setAppliances] = useState<Appliance[]>(DEFAULT_APPLIANCES);
  const [panelWc, setPanelWc] = useState(450);
  const [autonomyDays, setAutonomyDays] = useState(1);
  const [battery, setBattery] = useState<keyof typeof DOD>("lithium");
  const [nextId, setNextId] = useState(DEFAULT_APPLIANCES.length + 1);

  const [draft, setDraft] = useState({ name: "", watts: "", hours: "", qty: "1" });

  const result = useMemo(() => {
    // Consommation : P (W) × heures × quantité × 30 jours
    const dailyWh = appliances.reduce((sum, a) => sum + a.watts * a.hours * a.qty, 0);
    const monthlyKwh = (dailyWh * 30) / 1000;

    // Puissance crête nécessaire pour reconstituer la consommation journalière
    const requiredWc = dailyWh / (PEAK_SUN_HOURS * SYSTEM_EFFICIENCY);
    const panels = dailyWh > 0 ? Math.ceil(requiredWc / panelWc) : 0;
    const installedWc = panels * panelWc;

    // Stockage : énergie à couvrir / profondeur de décharge admissible
    const batteryKwh = (dailyWh * autonomyDays) / 1000 / DOD[battery];
    const batteryAh = (batteryKwh * 1000) / BATTERY_VOLTAGE;

    // Onduleur : puissance appelée simultanément, avec marge
    const connectedW = appliances.reduce((sum, a) => sum + a.watts * a.qty, 0);
    const inverterKva = (connectedW * SIMULTANEITY * INVERTER_MARGIN) / 1000;

    return {
      dailyWh,
      monthlyKwh,
      panels,
      installedWc,
      batteryKwh,
      batteryAh,
      inverterKva,
      connectedW,
    };
  }, [appliances, panelWc, autonomyDays, battery]);

  function update(id: number, patch: Partial<Appliance>) {
    setAppliances((list) => list.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  }

  function remove(id: number) {
    setAppliances((list) => list.filter((a) => a.id !== id));
  }

  function addDraft() {
    const watts = Number(draft.watts);
    const hours = Number(draft.hours);
    const qty = Number(draft.qty) || 1;
    if (!draft.name.trim() || !Number.isFinite(watts) || watts <= 0) return;

    setAppliances((list) => [
      ...list,
      { id: nextId, name: draft.name.trim(), watts, hours: Number.isFinite(hours) ? hours : 0, qty },
    ]);
    setNextId((n) => n + 1);
    setDraft({ name: "", watts: "", hours: "", qty: "1" });
  }

  function addPreset(preset: (typeof PRESETS)[number]) {
    setAppliances((list) => [...list, { id: nextId, ...preset, qty: 1 }]);
    setNextId((n) => n + 1);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
      {/* ------------------------------ Saisie ------------------------------ */}
      <div className="card">
        <h2 className="h3">1. Listez vos appareils</h2>
        <p className="mt-2 text-sm muted">
          Indiquez la puissance en watts, la durée d&rsquo;utilisation quotidienne et le nombre
          d&rsquo;exemplaires. Les valeurs par défaut correspondent à un foyer type.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-separate border-spacing-y-2 text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider muted">
                <th scope="col" className="pb-1 font-semibold">Appareil</th>
                <th scope="col" className="pb-1 font-semibold">Watts</th>
                <th scope="col" className="pb-1 font-semibold">h/jour</th>
                <th scope="col" className="pb-1 font-semibold">Qté</th>
                <th scope="col" className="pb-1 text-right font-semibold">kWh/mois</th>
                <th scope="col" className="pb-1">
                  <span className="sr-only">Supprimer</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {appliances.map((a) => (
                <tr key={a.id} className="align-middle">
                  <td className="pr-2">
                    <label className="sr-only" htmlFor={`name-${a.id}`}>
                      Nom de l&rsquo;appareil
                    </label>
                    <input
                      id={`name-${a.id}`}
                      value={a.name}
                      onChange={(e) => update(a.id, { name: e.target.value })}
                      className="w-full rounded-lg border bg-transparent px-2.5 py-1.5"
                    />
                  </td>
                  <td className="pr-2">
                    <label className="sr-only" htmlFor={`watts-${a.id}`}>
                      Puissance en watts de {a.name}
                    </label>
                    <input
                      id={`watts-${a.id}`}
                      type="number"
                      min={0}
                      inputMode="numeric"
                      value={a.watts}
                      onChange={(e) => update(a.id, { watts: Number(e.target.value) || 0 })}
                      className="w-20 rounded-lg border bg-transparent px-2.5 py-1.5"
                    />
                  </td>
                  <td className="pr-2">
                    <label className="sr-only" htmlFor={`hours-${a.id}`}>
                      Heures par jour pour {a.name}
                    </label>
                    <input
                      id={`hours-${a.id}`}
                      type="number"
                      min={0}
                      max={24}
                      step={0.5}
                      value={a.hours}
                      onChange={(e) => update(a.id, { hours: Number(e.target.value) || 0 })}
                      className="w-20 rounded-lg border bg-transparent px-2.5 py-1.5"
                    />
                  </td>
                  <td className="pr-2">
                    <label className="sr-only" htmlFor={`qty-${a.id}`}>
                      Quantité de {a.name}
                    </label>
                    <input
                      id={`qty-${a.id}`}
                      type="number"
                      min={1}
                      value={a.qty}
                      onChange={(e) => update(a.id, { qty: Number(e.target.value) || 1 })}
                      className="w-16 rounded-lg border bg-transparent px-2.5 py-1.5"
                    />
                  </td>
                  <td className="pr-2 text-right font-medium tabular-nums">
                    {numberFr.format((a.watts * a.hours * a.qty * 30) / 1000)}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => remove(a.id)}
                      aria-label={`Retirer ${a.name}`}
                      className="rounded-sm p-1.5 muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                    >
                      <CloseIcon width={16} height={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {appliances.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center muted">
                    Ajoutez un appareil pour lancer le calcul.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Ajout manuel */}
        <div className="mt-6 grid gap-2 rounded border p-3 sm:grid-cols-[1.6fr_.8fr_.8fr_.6fr_auto]">
          <input
            aria-label="Nom du nouvel appareil"
            placeholder="Autre appareil"
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            className="rounded-lg border bg-transparent px-2.5 py-1.5 text-sm"
          />
          <input
            aria-label="Puissance en watts"
            placeholder="Watts"
            type="number"
            min={0}
            value={draft.watts}
            onChange={(e) => setDraft({ ...draft, watts: e.target.value })}
            className="rounded-lg border bg-transparent px-2.5 py-1.5 text-sm"
          />
          <input
            aria-label="Heures par jour"
            placeholder="h/jour"
            type="number"
            min={0}
            max={24}
            step={0.5}
            value={draft.hours}
            onChange={(e) => setDraft({ ...draft, hours: e.target.value })}
            className="rounded-lg border bg-transparent px-2.5 py-1.5 text-sm"
          />
          <input
            aria-label="Quantité"
            placeholder="Qté"
            type="number"
            min={1}
            value={draft.qty}
            onChange={(e) => setDraft({ ...draft, qty: e.target.value })}
            className="rounded-lg border bg-transparent px-2.5 py-1.5 text-sm"
          />
          <button type="button" onClick={addDraft} className="btn-secondary px-4 py-1.5">
            Ajouter
          </button>
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider muted">Ajout rapide</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => addPreset(p)}
                className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors hover:border-accent hover:bg-panel"
              >
                + {p.name}
                <span className="muted"> · {p.watts} W</span>
              </button>
            ))}
          </div>
        </div>

        {/* Hypothèses */}
        <h2 className="h3 mt-10">2. Ajustez les hypothèses</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="panel-wc" className="text-sm font-medium">
              Puissance d&rsquo;un panneau
            </label>
            <select
              id="panel-wc"
              value={panelWc}
              onChange={(e) => setPanelWc(Number(e.target.value))}
              className="mt-1.5 w-full rounded-lg border bg-transparent px-3 py-2 text-sm"
            >
              {[300, 450].map((w) => (
                <option key={w} value={w}>
                  {w} Wc
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="autonomy" className="text-sm font-medium">
              Autonomie souhaitée
            </label>
            <select
              id="autonomy"
              value={autonomyDays}
              onChange={(e) => setAutonomyDays(Number(e.target.value))}
              className="mt-1.5 w-full rounded-lg border bg-transparent px-3 py-2 text-sm"
            >
              <option value={0.5}>Une demi-journée</option>
              <option value={1}>1 jour</option>
              <option value={2}>2 jours</option>
              <option value={3}>3 jours</option>
            </select>
          </div>
          <div>
            <label htmlFor="battery-tech" className="text-sm font-medium">
              Technologie batterie
            </label>
            <select
              id="battery-tech"
              value={battery}
              onChange={(e) => setBattery(e.target.value as keyof typeof DOD)}
              className="mt-1.5 w-full rounded-lg border bg-transparent px-3 py-2 text-sm"
            >
              <option value="lithium">Lithium LiFePO4 (85 % de décharge)</option>
              <option value="plomb">Plomb GEL/AGM (50 % de décharge)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ------------------------------ Résultats --------------------------- */}
      <div className="lg:sticky lg:top-24">
        <div className="card border-accent-line bg-surface">
          <h2 className="h3">Votre pré-dimensionnement</h2>

          <dl className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded border bg-surface p-4">
              <dt className="text-xs muted">Consommation</dt>
              <dd className="mt-1">
                <span className="text-2xl font-bold tabular-nums">
                  {numberFr.format(result.monthlyKwh)}
                </span>
                <span className="block text-xs font-medium muted">kWh / mois</span>
              </dd>
            </div>
            <div className="rounded border bg-surface p-4">
              <dt className="text-xs muted">Besoin journalier</dt>
              <dd className="mt-1">
                <span className="text-2xl font-bold tabular-nums">
                  {numberFr.format(result.dailyWh / 1000)}
                </span>
                <span className="block text-xs font-medium muted">kWh / jour</span>
              </dd>
            </div>
          </dl>

          <ul className="mt-4 space-y-3">
            <ResultRow
              icon={<PanelIcon width={20} height={20} />}
              label="Panneaux solaires"
              value={`${intFr.format(result.panels)} × ${panelWc} Wc`}
              hint={`Soit ${numberFr.format(result.installedWc / 1000)} kWc installés`}
            />
            <ResultRow
              icon={<BatteryIcon width={20} height={20} />}
              label="Parc batterie"
              value={`${numberFr.format(result.batteryKwh)} kWh`}
              hint={`≈ ${intFr.format(result.batteryAh)} Ah en ${BATTERY_VOLTAGE} V`}
            />
            <ResultRow
              icon={<BoltIcon width={20} height={20} />}
              label="Onduleur hybride"
              value={`${numberFr.format(result.inverterKva)} kVA`}
              hint={`${intFr.format(result.connectedW)} W raccordés au total`}
            />
          </ul>

          <p className="mt-5 flex gap-2 rounded border border-sun-line bg-sun-soft p-3 text-xs leading-relaxed">
            <SunIcon width={16} height={16} className="mt-0.5 shrink-0 text-sun" />
            <span>
              Estimation indicative basée sur {PEAK_SUN_HOURS} heures d&rsquo;ensoleillement
              équivalent plein soleil et {Math.round(SYSTEM_EFFICIENCY * 100)} % de rendement
              système. Un relevé sur site reste nécessaire pour établir un devis ferme.
            </span>
          </p>

          <Link href="/contact" className="btn-primary mt-5 w-full">
            Faire valider ce dimensionnement
            <ArrowRightIcon width={16} height={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ResultRow({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <li className="flex gap-4 rounded border bg-surface p-4">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-accent-soft text-accent">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline justify-between gap-x-3">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-lg font-bold tabular-nums">{value}</span>
        </span>
        <span className="mt-0.5 block text-xs muted">{hint}</span>
      </span>
    </li>
  );
}
