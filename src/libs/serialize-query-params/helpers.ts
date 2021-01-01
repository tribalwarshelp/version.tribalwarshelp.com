export function getEncodedValue(
  input: string | (string | null)[] | null | undefined,
  allowEmptyString?: boolean
): string | null | undefined {
  if (!input) {
    return undefined;
  }
  // '' or []
  if (
    input.length === 0 &&
    (!allowEmptyString || (allowEmptyString && input !== ''))
  ) {
    return null;
  }

  const str = input instanceof Array ? input[0] : input;
  if (str == null) {
    return str;
  }
  if (!allowEmptyString && str === '') {
    return null;
  }

  return str;
}
