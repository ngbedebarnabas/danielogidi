/** "Pastor Samuel Adeyemi" → "SA" (titles skipped). */
export const initials = (name: string) =>
  name
    .replace(/^(pastor|rev\.?|dr\.?|mr\.?|mrs\.?|ms\.?|hon\.?|bishop|apostle|sister|brother)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
