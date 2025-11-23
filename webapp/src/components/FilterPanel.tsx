import type { FilterOptions } from "@/types/job";
import clsx from "clsx";
import { useMemo } from "react";

interface FilterPanelProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
  availableTags: string[];
  availableLocations: string[];
}

const contractOptions: FilterOptions["contractType"][] = [
  "Tous",
  "CDI",
  "CDD",
  "Intérim",
  "Freelance",
  "Stage",
];

const remoteOptions: FilterOptions["remote"][] = [
  "Tous",
  "Hybride",
  "Présentiel",
  "Télétravail",
];

export const FilterPanel = ({
  filters,
  onChange,
  availableTags,
  availableLocations,
}: FilterPanelProps) => {
  const handleChange = <K extends keyof FilterOptions>(
    key: K,
    value: FilterOptions[K],
  ) => {
    onChange({ ...filters, [key]: value });
  };

  const tagGroups = useMemo(() => {
    return availableTags.reduce<Record<string, string[]>>((acc, tag) => {
      const [first, ...rest] = tag.split(" ");
      const initial = rest.length ? `${first} ${rest[0]}` : first;
      if (!acc[initial]) acc[initial] = [];
      acc[initial].push(tag);
      return acc;
    }, {});
  }, [availableTags]);

  return (
    <aside className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">
        Filtrez votre prochain rôle
      </h2>
      <p className="mt-1 text-sm text-zinc-500">
        Ajustez les critères pour cibler les opportunités qui vous ressemblent.
      </p>

      <div className="mt-6 space-y-6">
        <div>
          <label
            htmlFor="query"
            className="text-xs font-semibold uppercase text-zinc-500"
          >
            Mots-clés
          </label>
          <input
            id="query"
            value={filters.query}
            onChange={(event) => handleChange("query", event.target.value)}
            placeholder="Ex. pilotage budgétaire, IFRS, scale-up..."
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            type="text"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="text-xs font-semibold uppercase text-zinc-500"
          >
            Localisation
          </label>
          <select
            id="location"
            value={filters.location}
            onChange={(event) => handleChange("location", event.target.value)}
            className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            <option value="Toutes">Toutes</option>
            {availableLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-semibold uppercase text-zinc-500">
              Contrat
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {contractOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleChange("contractType", option)}
                  className={clsx(
                    "rounded-full border px-3 py-1 text-xs font-medium transition",
                    filters.contractType === option
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-zinc-200 text-zinc-600 hover:border-emerald-200 hover:text-emerald-600",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-zinc-500">
              Mode de travail
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {remoteOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleChange("remote", option)}
                  className={clsx(
                    "rounded-full border px-3 py-1 text-xs font-medium transition",
                    filters.remote === option
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-zinc-200 text-zinc-600 hover:border-emerald-200 hover:text-emerald-600",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="minSalary"
            className="text-xs font-semibold uppercase text-zinc-500"
          >
            Salaire minimum souhaité (k€)
          </label>
          <input
            id="minSalary"
            type="range"
            min={45}
            max={120}
            step={5}
            value={filters.minSalary}
            onChange={(event) =>
              handleChange("minSalary", Number(event.target.value))
            }
            className="mt-2 w-full accent-emerald-500"
          />
          <p className="mt-1 text-xs text-zinc-600">
            {filters.minSalary} k€ et plus
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase text-zinc-500">
            Expertises recherchées
          </p>
          <div className="mt-3 grid gap-2">
            {Object.entries(tagGroups).map(([group, tags]) => (
              <div key={group}>
                <p className="text-xs font-medium text-zinc-700">{group}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {tags.map((tag) => {
                    const selected = filters.tags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          const nextTags = selected
                            ? filters.tags.filter((item) => item !== tag)
                            : [...filters.tags, tag];
                          handleChange("tags", nextTags);
                        }}
                        className={clsx(
                          "rounded-full border px-3 py-1 text-xs font-medium transition",
                          selected
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-zinc-200 text-zinc-600 hover:border-emerald-200 hover:text-emerald-600",
                        )}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
