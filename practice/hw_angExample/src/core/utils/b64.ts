/*
  taken from
  https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
*/

export function b64EncodeUnicode(str: string): string {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode(Number('0x' + p1));
  }));
}

export function b64DecodeUnicode(str: string): string {
  return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
