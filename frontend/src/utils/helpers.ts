export function isEmtpy(str: string): boolean {
    return str === null || str.match(/^ *$/) !== null;
}

export function isSmallScreen(): boolean {
  return import.meta.client && window.matchMedia('(max-width: 768px)').matches;
}