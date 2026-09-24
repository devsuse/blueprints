type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | { [key: string]: any }
  | ClassValue[];

function flattenClasses(...inputs: ClassValue[]): string[] {
  const classes: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === "string" || typeof input === "number") {
      classes.push(...String(input).split(/\s+/));
    } else if (Array.isArray(input)) {
      classes.push(...flattenClasses(...input));
    } else if (typeof input === "object") {
      for (const key in input) {
        if (input[key]) classes.push(...key.split(/\s+/));
      }
    }
  }
  return classes.filter(Boolean);
}

export function merge(...inputs: ClassValue[]): string {
  const classList = flattenClasses(...inputs);
  const classMap = new Map<string, string>();

  for (const cls of classList) {
    const lastDash = cls.lastIndexOf("-");

    if (lastDash !== -1) {
      const key = cls.slice(0, lastDash);
      classMap.set(key, cls);
    } else {
      classMap.set(cls, cls);
    }
  }

  return Array.from(classMap.values()).join(" ");
}
