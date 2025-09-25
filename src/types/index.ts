/**
 * Type definitions for the dlist.gg API
 */

/**
 * Error response from the API
 */
export interface DetailError {
  message: string;
}

/**
 * Payload for updating a bot's guild count (standard format)
 */
export interface CountPayload {
  count: number;
}

/**
 * Payload for updating a bot's guild count (compatibility format)
 */
export interface CompatCountPayload {
  server_count: number;
}

/**
 * Options for the DList client
 */
export interface DListClientOptions {
  /**
   * Base URL for the API
   * @default "https://api.discordlist.gg/v0"
   */
  baseUrl?: string;
  
  /**
   * Timeout for API requests in milliseconds
   * @default 10000
   */
  timeout?: number;
}

/**
 * Vote data received from a webhook
 */
export interface VoteData {
  /**
   * The ID of the user who voted
   */
  userId: string;
  
  /**
   * The ID of the bot that was voted for
   */
  botId: string;
  
  /**
   * The timestamp when the vote was cast
   */
  timestamp: number;
  
  /**
   * Whether this is a test vote
   */
  isTest?: boolean;
}

/**
 * Response from setting a bot's guild count
 */
export type SetGuildCountResponse = boolean;
