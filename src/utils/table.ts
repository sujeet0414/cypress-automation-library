export function tableRow(index: number): string {
  return `table tbody tr:nth-child(${index})`;
}

export function tableCell(row: number, col: number): string {
  return `table tbody tr:nth-child(${row}) td:nth-child(${col})`;
}

export function tableRowByText(text: string): string {
  return `table tbody tr:contains("${text}")`;
}

export function tableHeader(col: number): string {
  return `table thead th:nth-child(${col})`;
}
