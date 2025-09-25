/**
 * Basic usage examples for the dlist-api-wrapper
 */

import { DListClient } from '../index';

// Initialize the client with your bot's API key
const client = new DListClient('your-api-key-here');

/**
 * Example: Update a bot's guild count using the preferred PUT endpoint
 */
async function updateGuildCount() {
  try {
    const botId = '123456789012345678';
    const guildCount = 100;
    
    const result = await client.bot.setGuildCount(botId, guildCount);
    console.log('Guild count updated successfully:', result);
  } catch (error) {
    console.error('Failed to update guild count:', error);
  }
}

/**
 * Example: Verify webhook data
 */
function verifyWebhook() {
  try {
    const webhookSecret = 'your-webhook-secret';
    const jwtToken = 'example-jwt-token'; // This would come from the webhook request body
    
    const voteData = client.webhooks.verifyVote(webhookSecret, jwtToken);
    console.log('Vote data verified:', voteData);
    
    // Now you can reward the user for voting
    console.log(`User ${voteData.userId} voted for bot ${voteData.botId} at ${new Date(voteData.timestamp).toISOString()}`);
  } catch (error) {
    console.error('Failed to verify webhook data:', error);
  }
}

// Run the examples
updateGuildCount().catch(console.error);
// verifyWebhook(); // Uncomment to test webhook verification
