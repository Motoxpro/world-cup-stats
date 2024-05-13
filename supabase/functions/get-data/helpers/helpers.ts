/**
 * Hash function to generate a unique hash for a given input string.
 */
export function generateUniqueId(input: string): string {
  let hash = 0;
  const prime = 31;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = (hash * prime + char) & 0xffffffff; // Keep it within 32 bits
  }
  // eslint-disable-next-line no-bitwise
  hash >>>= 0; // Convert to unsigned 32-bit integer
  return hash.toString(16).padStart(8, '0'); // Convert to hexadecimal and pad with zeros
}
