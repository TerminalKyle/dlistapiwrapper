/**
 * Bot-related API endpoints
 */

import axios from 'axios';
import { validateBotId, validateGuildCount, handleApiError, createAuthHeaders } from '../utils';
import { CountPayload, CompatCountPayload, SetGuildCountResponse } from '../types';

/**
 * Class for handling bot-related API endpoints
 */
export class BotEndpoints {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeout: number;
  
  /**
   * Creates a new instance of the BotEndpoints class
   * 
   * @param apiKey - The API key for authentication
   * @param baseUrl - The base URL for the API
   * @param timeout - The timeout for API requests in milliseconds
   */
  constructor(apiKey: string, baseUrl: string, timeout: number) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }
  
  /**
   * Updates a bot's guild count using the preferred PUT endpoint
   * 
   * @param botId - The ID of the bot
   * @param count - The number of guilds the bot is in
   * @returns A promise that resolves to true if successful
   */
  public async setGuildCount(botId: string | number, count: number): Promise<SetGuildCountResponse> {
    const id = validateBotId(botId);
    const validCount = validateGuildCount(count);
    
    try {
      const response = await axios.put<SetGuildCountResponse>(
        `${this.baseUrl}/bots/${id}/guilds`,
        null,
        {
          params: { count: validCount },
          headers: createAuthHeaders(this.apiKey),
          timeout: this.timeout,
        }
      );
      
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
  
  /**
   * Updates a bot's guild count using the POST endpoint variant
   * Note: This is a compatibility endpoint, prefer setGuildCount() when possible
   * 
   * @param botId - The ID of the bot
   * @param count - The number of guilds the bot is in
   * @returns A promise that resolves to true if successful
   */
  public async setGuildCountPost(botId: string | number, count: number): Promise<SetGuildCountResponse> {
    const id = validateBotId(botId);
    const validCount = validateGuildCount(count);
    
    const payload: CountPayload = {
      count: validCount,
    };
    
    try {
      const response = await axios.post<SetGuildCountResponse>(
        `${this.baseUrl}/bots/${id}/guilds`,
        payload,
        {
          headers: createAuthHeaders(this.apiKey),
          timeout: this.timeout,
        }
      );
      
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
  
  /**
   * Updates a bot's guild count using the Top.gg compatible endpoint
   * Note: This is a compatibility endpoint, prefer setGuildCount() when possible
   * 
   * @param botId - The ID of the bot
   * @param count - The number of guilds the bot is in
   * @returns A promise that resolves to true if successful
   */
  public async setGuildCountTopGg(botId: string | number, count: number): Promise<SetGuildCountResponse> {
    const id = validateBotId(botId);
    const validCount = validateGuildCount(count);
    
    const payload: CompatCountPayload = {
      server_count: validCount,
    };
    
    try {
      const response = await axios.post<SetGuildCountResponse>(
        `${this.baseUrl}/bots/${id}/stats`,
        payload,
        {
          headers: createAuthHeaders(this.apiKey),
          timeout: this.timeout,
        }
      );
      
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
}
