export function getInitialFromAccountUuid(
  initialAccountUuid: string | null | undefined,
  defaultAccountUuid: string | null | undefined,
): string {
  return initialAccountUuid || defaultAccountUuid || "";
}
