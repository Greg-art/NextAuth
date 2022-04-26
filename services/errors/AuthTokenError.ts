export class AuthTokenError extends Error {
  constructor() {
    super('error with authentication token.')
    // 'super' chama o pai
  }
}