/**
 * dlist-api-wrapper - A beautiful and elegant API wrapper for the dlist.gg API
 */

import { BotEndpoints } from './endpoints/bot';
import { WebhookManager } from './webhooks';
import { DListClientOptions } from './types';

/**
 * Main client class for interacting with the dlist.gg API
 */
export class DListClient {
  /**
   * Bot-related API endpoints
   */
  public readonly bot: BotEndpoints;
  
  /**
   * Webhook handling functionality
   */
  public readonly webhooks: WebhookManager;
  
  /**
   * The API key used for authentication
   */
  private readonly apiKey: string;
  
  /**
   * The base URL for the API
   */
  private readonly baseUrl: string;
  
  /**
   * The timeout for API requests in milliseconds
   */
  private readonly timeout: number;
  
  /**
   * Creates a new instance of the DListClient
   * 
   * @param apiKey - The API key for authentication
   * @param options - Additional options for the client
   */
  constructor(apiKey: string, options: DListClientOptions = {}) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    
    this.apiKey = apiKey;
    this.baseUrl = options.baseUrl || 'https://api.discordlist.gg/v0';
    this.timeout = options.timeout || 10000;
    
    // Initialize endpoints
    this.bot = new BotEndpoints(this.apiKey, this.baseUrl, this.timeout);
    this.webhooks = new WebhookManager();
  }
}

// Export all types and errors for users of the library
export * from './types';
export * from './errors';