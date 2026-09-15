import { Switch } from "@/components/ui/switch";

export default function Home() {
  return (
    <main className="max-w-5xl w-full mx-auto space-y-16">
      <header className="relative mt-8 space-y-2 w-full">
        <h1 className="text-5xl font-[450] text-neutral-50 text-right">
          Blueprints
        </h1>
        <p className="text-neutral-300 text-right">
          Components built to perfection, to copy and adapt.
        </p>
      </header>

      <div className="relative aspect-video bg-neutral-900 border border-neutral-800 flex items-center justify-center w-1/2 rounded-2xl">
        <Switch aria-label="example" />
      </div>
    </main>
  );
}
