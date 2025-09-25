/**
 * Webhook handling functionality for dlist.gg
 */

import jwt from 'jsonwebtoken';
import { WebhookVerificationError } from '../errors';
import { VoteData } from '../types';

/**
 * Class for handling webhook operations
 */
export class WebhookManager {
  /**
   * Verifies a webhook payload using JWT
   * 
   * @param secret - The webhook secret used to sign the JWT
   * @param token - The JWT token to verify
   * @returns The decoded vote data
   * @throws {WebhookVerificationError} If verification fails
   */
  public verifyVote(secret: string, token: string): VoteData {
    try {
      // Verify the JWT token using the webhook secret
      const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
      
      // Ensure the decoded data has the expected structure
      if (typeof decoded !== 'object' || decoded === null) {
        throw new WebhookVerificationError('Invalid webhook data format');
      }
      
      const voteData = decoded as Record<string, unknown>;
      
      // Validate required fields
      if (!voteData.userId || !voteData.botId || !voteData.timestamp) {
        throw new WebhookVerificationError('Missing required fields in webhook data');
      }
      
      return {
        userId: String(voteData.userId),
        botId: String(voteData.botId),
        timestamp: Number(voteData.timestamp),
        isTest: Boolean(voteData.isTest),
      };
    } catch (error) {
      if (error instanceof WebhookVerificationError) {
        throw error;
      }
      
      // If it's a JWT verification error, wrap it in our custom error
      if (error instanceof Error) {
        throw new WebhookVerificationError(`Webhook verification failed: ${error.message}`);
      }
      
      throw new WebhookVerificationError('Webhook verification failed');
    }
  }
}
