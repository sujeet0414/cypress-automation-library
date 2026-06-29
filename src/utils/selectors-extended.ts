export function byLabel(label: string): string {
  return `label:contains("${label}")`;
}

export function inputByLabel(label: string): string {
  return `label:contains("${label}") + input, label:contains("${label}") input`;
}

export function byPlaceholder(placeholder: string): string {
  return `[placeholder="${placeholder}"]`;
}

export function byName(name: string): string {
  return `[name="${name}"]`;
}

export function byClass(className: string): string {
  return `.${className}`;
}

export function modalSelector(testId?: string): string {
  return testId ? `[role="dialog"][data-testid="${testId}"]` : '[role="dialog"]';
}
