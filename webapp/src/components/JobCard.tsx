import { formatDate, formatSalary } from "@/lib/formatters";
import type { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            {job.company}
          </p>
          <h2 className="mt-1 text-xl font-bold text-zinc-900">
            {job.title}
          </h2>
          <p className="text-sm text-zinc-500">
            {job.location} • {job.contractType} • {job.remote}
          </p>
        </div>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium uppercase text-zinc-600">
          Publié le {formatDate(job.publishDate)}
        </span>
      </header>

      <p className="mt-4 text-sm font-semibold text-zinc-800">
        Rémunération : {formatSalary(job.salaryRange)}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-zinc-600">
        {job.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span
            key={`${job.id}-${tag}`}
            className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <section className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">
            Missions clés
          </h3>
          <ul className="mt-2 space-y-2 text-sm text-zinc-600">
            {job.missions.slice(0, 3).map((mission) => (
              <li key={`${job.id}-mission-${mission}`}>• {mission}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">
            Compétences recherchées
          </h3>
          <ul className="mt-2 space-y-2 text-sm text-zinc-600">
            {job.competences.slice(0, 3).map((competence) => (
              <li key={`${job.id}-competence-${competence}`}>
                • {competence}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl bg-zinc-50 p-3">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Pilotage budgétaire
          </p>
          <p className="mt-1 text-sm font-semibold text-zinc-800">
            {job.analysticsHighlights.budgetResponsibility}
          </p>
        </div>
        <div className="rounded-xl bg-zinc-50 p-3">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Équipe
          </p>
          <p className="mt-1 text-sm font-semibold text-zinc-800">
            {job.analysticsHighlights.teamSize}
          </p>
        </div>
        <div className="rounded-xl bg-zinc-50 p-3">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Reporting
          </p>
          <p className="mt-1 text-sm font-semibold text-zinc-800">
            {job.analysticsHighlights.reportingTo}
          </p>
        </div>
      </footer>
    </article>
  );
};
