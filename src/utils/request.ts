export function convertToProxy(url: string): string {
  const temp = url.split("/");
  temp[0] = "http:";
  temp[2] = "127.0.0.1:29417";
  return temp.join("/");
}
