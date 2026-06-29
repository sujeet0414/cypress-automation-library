export function iframeSelector(selector: string): string {
  return `iframe${selector}`;
}

export function iframeByTestId(testId: string): string {
  return `iframe[data-testid="${testId}"]`;
}

export function iframeByName(name: string): string {
  return `iframe[name="${name}"]`;
}
