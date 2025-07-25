import { debounce, delay } from "lodash"
// Typed debounce wrapper
export const customDebounce = <T extends (...args: any[]) => any>(
  fn: T
) => {
  return debounce(fn, 500);
};

export const customDelay = (fun: any) => {
  return delay(fun, 300);
}