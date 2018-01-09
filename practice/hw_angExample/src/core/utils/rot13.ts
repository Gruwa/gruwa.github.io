export function rot13(rawString: string): string {
  return rawString.replace(/[a-zA-Z]/g, (c: any) => {
    return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
  });
}
