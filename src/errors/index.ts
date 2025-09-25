/**
 * Custom error classes for the dlist.gg API wrapper
 */

/**
 * Base error class for all dlist-api-wrapper errors
 */
export class DListError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error thrown when API requests fail due to authentication issues
 */
export class AuthenticationError extends DListError {
  constructor(message = 'Authentication failed. Please check your API key.') {
    super(message);
  }
}

/**
 * Error thrown when a request is rate limited by the API
 */
export class RateLimitError extends DListError {
  constructor(message = 'Rate limit exceeded. Please try again later.') {
    super(message);
  }
}

/**
 * Error thrown when a resource is not found
 */
export class NotFoundError extends DListError {
  constructor(message = 'The requested resource was not found.') {
    super(message);
  }
}

/**
 * Error thrown when the API returns a 400 Bad Request response
 */
export class BadRequestError extends DListError {
  constructor(message = 'The request was invalid.') {
    super(message);
  }
}

/**
 * Error thrown when the API returns a 403 Forbidden response
 */
export class ForbiddenError extends DListError {
  constructor(message = 'You do not have permission to access this resource.') {
    super(message);
  }
}

/**
 * Error thrown when the API returns a 500 Internal Server Error response
 */
export class ServerError extends DListError {
  constructor(message = 'An internal server error occurred.') {
    super(message);
  }
}

/**
 * Error thrown when webhook verification fails
 */
export class WebhookVerificationError extends DListError {
  constructor(message = 'Failed to verify webhook data.') {
    super(message);
  }
}

/**
 * Maps HTTP status codes to error classes
 */
export const errorMap = {
  400: BadRequestError,
  401: AuthenticationError,
  403: ForbiddenError,
  404: NotFoundError,
  429: RateLimitError,
  500: ServerError,
};
