"use client";

import { useMemo, useState } from "react";

import { FilterPanel } from "./FilterPanel";
import { JobCard } from "./JobCard";
import { StatsStrip } from "./StatsStrip";
import { jobs } from "@/data/jobs";
import type { FilterOptions, Job } from "@/types/job";

const defaultFilters: FilterOptions = {
  query: "",
  location: "Toutes",
  contractType: "Tous",
  remote: "Tous",
  minSalary: 60,
  tags: [],
};

const applyFilters = (jobList: Job[], filters: FilterOptions) => {
  return jobList.filter((job) => {
    if (filters.location !== "Toutes" && job.location !== filters.location) {
      return false;
    }

    if (filters.contractType !== "Tous" && job.contractType !== filters.contractType) {
      return false;
    }

    if (filters.remote !== "Tous" && job.remote !== filters.remote) {
      return false;
    }

    if (job.salaryRange[0] < filters.minSalary * 1000) {
      return false;
    }

    const query = filters.query.trim().toLowerCase();
    if (query) {
      const haystack = [
        job.title,
        job.company,
        job.location,
        job.description,
        ...job.tags,
        ...job.missions,
        ...job.competences,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) {
        return false;
      }
    }

    if (filters.tags.length > 0) {
      const matches = filters.tags.every((tag) => job.tags.includes(tag));
      if (!matches) return false;
    }

    return true;
  });
};

export const JobExplorer = () => {
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);

  const { filteredJobs, tagSet, locationSet } = useMemo(() => {
    const filtered = applyFilters(jobs, filters);
    const tagCollection = new Set<string>();
    const locationCollection = new Set<string>();

    jobs.forEach((job) => {
      job.tags.forEach((tag) => tagCollection.add(tag));
      locationCollection.add(job.location);
    });

    return {
      filteredJobs: filtered,
      tagSet: Array.from(tagCollection),
      locationSet: Array.from(locationCollection),
    };
  }, [filters]);

  const seniorityCount = useMemo(() => {
    return filteredJobs.reduce<Record<string, number>>((acc, job) => {
      acc[job.experience] = (acc[job.experience] || 0) + 1;
      return acc;
    }, {});
  }, [filteredJobs]);

  const totalSalaryWindow = useMemo(() => {
    if (filteredJobs.length === 0) return { min: 0, max: 0 };
    const min = Math.min(...filteredJobs.map((job) => job.salaryRange[0]));
    const max = Math.max(...filteredJobs.map((job) => job.salaryRange[1]));
    return { min, max };
  }, [filteredJobs]);

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div className="order-2 space-y-6 lg:order-1">
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          availableTags={tagSet}
          availableLocations={locationSet}
        />

        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">
            Votre trajectoire de leadership
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Ateliers, mentorat et formations pour accélérer votre prise de poste
            en direction financière.
          </p>
          <div className="mt-5 space-y-4 text-sm text-zinc-700">
            <div>
              <p className="font-semibold text-emerald-700">
                Programme “Finance Leader Sprint”
              </p>
              <p>
                6 semaines de coaching collectif pour affûter votre posture de
                responsable finance.
              </p>
            </div>
            <div>
              <p className="font-semibold text-emerald-700">
                Masterclass transformation digitale
              </p>
              <p>
                Workshops autour de SAP S/4HANA, Pigment, Anaplan et Power BI
                pour industrialiser vos reportings.
              </p>
            </div>
            <div>
              <p className="font-semibold text-emerald-700">
                Communauté CFO & FP&A
              </p>
              <p>
                Partage de benchmarks salariaux, bonnes pratiques d&apos;equipes
                finances et accès à des offres confidentielles.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="order-1 space-y-6 lg:order-2">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">
            Opportunités finance & comptabilité
          </p>
          <h1 className="mt-3 text-3xl font-bold text-zinc-950 sm:text-4xl">
            Pilotez votre prochaine prise de fonction en finance de direction
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600">
            Accédez à une sélection d&apos;offres senior orientées management,
            contrôle de gestion et finance stratégique. Analysez les packages,
            responsabilités et outils clés pour préparer vos candidatures.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-zinc-50 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Offres correspondant à vos critères
              </p>
              <p className="mt-2 text-2xl font-bold text-zinc-900">
                {filteredJobs.length}
              </p>
            </div>
            <div className="rounded-2xl bg-zinc-50 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Fourchette salariale constatée
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-900">
                {totalSalaryWindow.min / 1000} k€ – {totalSalaryWindow.max / 1000} k€
              </p>
            </div>
            <div className="rounded-2xl bg-zinc-50 p-4">
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Seniorité ciblée
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-900">
                {Object.keys(seniorityCount)
                  .map((level) => `${level} (${seniorityCount[level]})`)
                  .join(" • ") || "Responsable & Manager"}
              </p>
            </div>
          </div>
        </div>

        <StatsStrip />

        <section className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-emerald-300 bg-emerald-50/50 p-10 text-center">
              <p className="text-lg font-semibold text-emerald-900">
                Aucun résultat pour ces filtres
              </p>
              <p className="mt-2 text-sm text-emerald-700">
                Ajustez le salaire ou élargissez vos tags pour révéler davantage
                d&apos;opportunités managériales.
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
          )}
        </section>
      </div>
    </div>
  );
};
