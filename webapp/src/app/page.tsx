import { JobExplorer } from "@/components/JobExplorer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-zinc-50 to-white py-12">
      <div className="mx-auto w-full max-w-6xl px-6">
        <JobExplorer />
      </div>
    </div>
  );
}
