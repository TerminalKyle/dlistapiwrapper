/**
 * Utility functions for the dlist.gg API wrapper
 */

import axios, { AxiosError, AxiosResponse } from 'axios';
import { errorMap, DListError, ServerError } from '../errors';
import { DetailError } from '../types';

/**
 * Handles API errors and transforms them into appropriate custom error types
 * 
 * @param error - The error from the axios request
 * @returns A rejected promise with the appropriate error type
 */
export function handleApiError(error: unknown): Promise<never> {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<DetailError>;
    const status = axiosError.response?.status || 500;
    const message = axiosError.response?.data?.message || axiosError.message;
    
    // Get the appropriate error class for this status code
    const ErrorClass = errorMap[status as keyof typeof errorMap] || ServerError;
    return Promise.reject(new ErrorClass(message));
  }
  
  // If it's not an Axios error, just wrap it in our base error class
  if (error instanceof Error) {
    return Promise.reject(new DListError(error.message));
  }
  
  // For unknown errors
  return Promise.reject(new DListError('An unknown error occurred'));
}

/**
 * Validates a bot ID to ensure it's a valid snowflake
 * 
 * @param botId - The bot ID to validate
 * @returns The bot ID if valid
 * @throws {Error} If the bot ID is invalid
 */
export function validateBotId(botId: string | number): string {
  const id = String(botId);
  
  // Discord IDs are numeric snowflakes
  if (!/^\d+$/.test(id)) {
    throw new Error('Invalid bot ID: must be a numeric Discord snowflake');
  }
  
  return id;
}

/**
 * Validates a guild count to ensure it's a positive integer
 * 
 * @param count - The guild count to validate
 * @returns The guild count if valid
 * @throws {Error} If the guild count is invalid
 */
export function validateGuildCount(count: number): number {
  if (!Number.isInteger(count) || count < 0) {
    throw new Error('Invalid guild count: must be a non-negative integer');
  }
  
  return count;
}

/**
 * Creates authorization headers with the provided API key
 * 
 * @param apiKey - The API key to use for authorization
 * @returns The headers object with authorization
 */
export function createAuthHeaders(apiKey: string): Record<string, string> {
  return {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };
}
