import { formatNumber } from "@/lib/numbers";

const stats = [
  {
    label: "Equipes financières accompagnées",
    value: 128,
    accent: "+12% YoY",
  },
  {
    label: "Rôles de management disponibles",
    value: 42,
    accent: "Contrôle & reporting",
  },
  {
    label: "Packages supérieurs à 80 k€",
    value: 31,
    accent: "Focus senior & responsable",
  },
  {
    label: "Projets finance durable",
    value: 14,
    accent: "ESG intégrés",
  },
];

export const StatsStrip = () => {
  return (
    <section className="grid gap-3 rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 text-sm text-emerald-900 md:grid-cols-4">
      {stats.map((item) => (
        <div key={item.label} className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-emerald-700/70">
            {item.label}
          </p>
          <p className="text-xl font-bold md:text-2xl">
            {formatNumber(item.value)}
          </p>
          <p className="text-xs font-medium text-emerald-700/90">
            {item.accent}
          </p>
        </div>
      ))}
    </section>
  );
};
