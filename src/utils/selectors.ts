export function byTestId(testId: string): string {
  return `[data-testid="${testId}"]`;
}

export function byRole(role: string, name?: string): string {
  if (name) {
    return `[role="${role}"][aria-label="${name}"]`;
  }
  return `[role="${role}"]`;
}

export function byText(text: string, tag = '*'): string {
  return `${tag}:contains("${text}")`;
}

export function byAttribute(attr: string, value: string): string {
  return `[${attr}="${value}"]`;
}

export function buildSelector(...parts: string[]): string {
  return parts.filter(Boolean).join(' ');
}
