import { Switch as Base } from "@base-ui/react/switch";

export function Switch({ ...props }: Base.Root.Props) {
  return (
    <Base.Root
      className="relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full bg-neutral-800 transition-colors data-checked:bg-blue-600"
      {...props}
    >
      <Base.Thumb className="absolute top-1/2 -translate-y-1/2 rounded-full transition-all not-data-checked:left-1 bg-neutral-300 data-checked:left-4 h-3.5 w-5 data-checked:bg-neutral-50" />
    </Base.Root>
  );
}
