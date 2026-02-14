export async function hashPin(pin: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export async function verifyPin(pin: string, hashedPin: string): Promise<boolean> {
  const pinHash = await hashPin(pin);
  return pinHash === hashedPin;
}

export function validatePinFormat(pin: string): boolean {
  return /^\d{4,6}$/.test(pin);
}
