export function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid w-full min-h-screen">
      {/*Rulers*/}
      <div className="[grid-area:1/1] h-6 sticky top-0 left-0 z-40" aria-hidden>
        <div className="absolute inset-0 bg-neutral-900 border-b-2 border-neutral-800" />
        <div className="absolute top-0 left-[calc(var(--spacing)*8-1px)] w-[calc(100%-var(--spacing)*8-1px)] h-4 bg-[linear-gradient(to_right,var(--color-neutral-800)_2px,transparent_2px)] bg-size-[32px_100%]" />
        <div className="absolute top-0 left-[calc(var(--spacing)*8-1px)] w-[calc(100%-var(--spacing)*8-1px)] h-2 bg-[linear-gradient(to_right,var(--color-neutral-800)_2px,transparent_2px)] bg-size-[8px_100%]" />
      </div>
      <div className="contents" aria-hidden>
        <div className="[grid-area:1/1] w-6 h-full absolute top-0 left-0 bg-neutral-900 border-r-2 border-neutral-800 z-0" />
        <div className="[grid-area:1/1] w-4 h-[calc(100%-var(--spacing)*8-1px)] bg-[linear-gradient(to_bottom,var(--color-neutral-800)_2px,transparent_2px)] bg-size-[100%_32px] mt-[calc(var(--spacing)*8-1px)] relative z-10" />
        <div className="[grid-area:1/1] w-2 h-[calc(100%-var(--spacing)*8-1px)] bg-[linear-gradient(to_bottom,var(--color-neutral-800)_2px,transparent_2px)] bg-size-[100%_8px] mt-[calc(var(--spacing)*8-1px)] relative z-10" />
      </div>

      {/*Corner*/}
      <div
        className="[grid-area:1/1] w-6 h-6 sticky top-0 z-50 bg-neutral-900 border-b-2 border-r-2 border-neutral-800 justify-self-start self-start pointer-events-none"
        aria-hidden
      />

      {/*Dots*/}
      <div
        className="[grid-area:1/1] w-[calc(100%-var(--spacing)*6)] h-[calc(100%-var(--spacing)*6)] bg-[radial-gradient(circle,var(--color-neutral-900)_1px,transparent_1px)] bg-size-[16_16] bg-top-left ml-6 mt-6"
        aria-hidden
      />

      {/*Content*/}
      <div className="[grid-area:1/1] p-8 z-10">{children}</div>
    </div>
  );
}
