// Turn these on as the matching backend endpoints ship.
export const features = {
  /** POST /api/v1/auth/password/forgot and /reset (FR-IAM-004) */
  passwordReset: false,
  /** POST /api/v1/auth/verify (FR-IAM-003) */
  emailVerification: false,
};
