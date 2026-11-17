/** Join class names, ignoring falsy values. */
export const cn = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ');
