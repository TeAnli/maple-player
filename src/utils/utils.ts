export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function execute<T>(fn: () => T | Promise<T>, ms: number): Promise<T> {
  await sleep(ms);
  return await fn();
}
