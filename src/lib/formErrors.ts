import type { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';
import { isApiError, userMessage } from '@/api/errors';

/**
 * Puts server-side validation errors (400 VALIDATION_FAILED -> errors[]) on the matching fields.
 * Returns a message for anything that could not be placed on a field, or null.
 */
export function applyServerErrors<T extends FieldValues>(error: unknown, setError: UseFormSetError<T>, knownFields: readonly string[]): string | null {
  if (isApiError(error) && error.fieldErrors.length > 0) {
    let unplaced = false;
    for (const fe of error.fieldErrors) {
      if (knownFields.includes(fe.field)) setError(fe.field as FieldPath<T>, { type: 'server', message: fe.message });
      else unplaced = true;
    }
    return unplaced ? userMessage(error) : null;
  }
  return userMessage(error);
}
