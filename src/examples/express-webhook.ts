/**
 * Example of integrating with Express.js for webhook handling
 */

import express from 'express';
import { DListClient, WebhookVerificationError } from '../index';

// Initialize Express app
const app = express();
app.use(express.json());

// Initialize the client with your bot's API key
const client = new DListClient('your-api-key-here');

// Webhook secret from your dlist.gg dashboard
const webhookSecret = 'your-webhook-secret';

/**
 * Webhook endpoint for receiving vote notifications
 */
app.post('/webhook', (req, res) => {
  try {
    // The JWT token should be in the request body
    const token = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Missing token in request body' });
    }
    
    // Verify the webhook data
    const voteData = client.webhooks.verifyVote(webhookSecret, token);
    
    console.log('Vote received:', voteData);
    
    // Here you would typically:
    // 1. Check if this is a test vote (voteData.isTest)
    // 2. Verify the user exists in your database
    // 3. Award the user their voting rewards
    
    // For this example, we'll just log the vote data
    console.log(`User ${voteData.userId} voted for bot ${voteData.botId}`);
    console.log(`Vote timestamp: ${new Date(voteData.timestamp).toISOString()}`);
    
    // Respond with success
    return res.status(200).json({ success: true });
  } catch (error) {
    // Handle verification errors
    if (error instanceof WebhookVerificationError) {
      console.error('Webhook verification failed:', error.message);
      return res.status(401).json({ error: 'Invalid webhook data' });
    }
    
    // Handle other errors
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
