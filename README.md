# dlist-api-wrapper Documentation

A beautiful and elegant API wrapper for the [dlist.gg API](https://api.discordlist.gg/developers).

## Special Mentions

This wrapper is inspired by and built for the amazing [dlist.gg](https://discordlist.gg/) platform - your place to find Discord Bots & Servers. We also acknowledge the excellent work done by [Luna-devv/dlist.js](https://github.com/Luna-devv/dlist.js) which served as inspiration for this TypeScript-focused implementation.

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
  - [DListClient](#dlistclient)
  - [Bot Endpoints](#bot-endpoints)
  - [Webhook Management](#webhook-management)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [TypeScript Support](#typescript-support)

## Installation

```bash
npm install dlist-api-wrapper
```

## Getting Started

To use the dlist-api-wrapper, you'll need an API key from the dlist.gg dashboard. You can get one by visiting `https://discordlist.gg/bot/<your bot id>/dashboard/webhooks` and clicking "Regenerate Token".

```typescript
import { DListClient } from 'dlist-api-wrapper';

// Initialize the client with your bot's API key
const client = new DListClient('your-api-key-here');

// Now you can use the client to interact with the dlist.gg API
```

## API Reference

### DListClient

The main client class for interacting with the dlist.gg API.

#### Constructor

```typescript
new DListClient(apiKey: string, options?: DListClientOptions)
```

- `apiKey` - Your bot's API key from the dlist.gg dashboard
- `options` - Optional configuration options
  - `baseUrl` - The base URL for the API (default: `https://api.discordlist.gg/v0`)
  - `timeout` - The timeout for API requests in milliseconds (default: `10000`)

### Bot Endpoints

Methods for interacting with bot-related endpoints.

#### setGuildCount

Updates a bot's guild count using the preferred PUT endpoint.

```typescript
client.bot.setGuildCount(botId: string | number, count: number): Promise<boolean>
```

- `botId` - The ID of the bot
- `count` - The number of guilds the bot is in
- Returns a promise that resolves to `true` if successful

#### setGuildCountPost

Updates a bot's guild count using the POST endpoint variant. This is a compatibility endpoint, prefer `setGuildCount()` when possible.

```typescript
client.bot.setGuildCountPost(botId: string | number, count: number): Promise<boolean>
```

- `botId` - The ID of the bot
- `count` - The number of guilds the bot is in
- Returns a promise that resolves to `true` if successful

#### setGuildCountTopGg

Updates a bot's guild count using the Top.gg compatible endpoint. This is a compatibility endpoint, prefer `setGuildCount()` when possible.

```typescript
client.bot.setGuildCountTopGg(botId: string | number, count: number): Promise<boolean>
```

- `botId` - The ID of the bot
- `count` - The number of guilds the bot is in
- Returns a promise that resolves to `true` if successful

### Webhook Management

Methods for handling webhook operations.

#### verifyVote

Verifies a webhook payload using JWT.

```typescript
client.webhooks.verifyVote(secret: string, token: string): VoteData
```

- `secret` - The webhook secret used to sign the JWT
- `token` - The JWT token to verify
- Returns the decoded vote data
- Throws a `WebhookVerificationError` if verification fails

## Error Handling

The library provides custom error classes for handling different types of errors:

- `DListError` - Base error class for all dlist-api-wrapper errors
- `AuthenticationError` - Thrown when API requests fail due to authentication issues
- `RateLimitError` - Thrown when a request is rate limited by the API
- `NotFoundError` - Thrown when a resource is not found
- `BadRequestError` - Thrown when the API returns a 400 Bad Request response
- `ForbiddenError` - Thrown when the API returns a 403 Forbidden response
- `ServerError` - Thrown when the API returns a 500 Internal Server Error response
- `WebhookVerificationError` - Thrown when webhook verification fails

Example:

```typescript
try {
  await client.bot.setGuildCount('123456789012345678', 100);
} catch (error) {
  if (error instanceof RateLimitError) {
    console.error('Rate limited! Try again later.');
  } else if (error instanceof AuthenticationError) {
    console.error('Invalid API key!');
  } else {
    console.error('An error occurred:', error);
  }
}
```

## Examples

### Updating Guild Count

```typescript
import { DListClient } from 'dlist-api-wrapper';

const client = new DListClient('your-api-key-here');

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

updateGuildCount();
```

### Webhook Handling with Express.js

```typescript
import express from 'express';
import { DListClient, WebhookVerificationError } from 'dlist-api-wrapper';

// Initialize Express app
const app = express();
app.use(express.json());

// Initialize the client with your bot's API key
const client = new DListClient('your-api-key-here');

// Webhook secret from your dlist.gg dashboard
const webhookSecret = 'your-webhook-secret';

app.post('/webhook', (req, res) => {
  try {
    // The JWT token should be in the request body
    const token = req.body;
    
    // Verify the webhook data
    const voteData = client.webhooks.verifyVote(webhookSecret, token);
    
    console.log(`User ${voteData.userId} voted for bot ${voteData.botId}`);
    
    // Reward the user for voting
    
    return res.status(200).json({ success: true });
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      return res.status(401).json({ error: 'Invalid webhook data' });
    }
    
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

## TypeScript Support

This library is written in TypeScript and provides full type definitions for all its features. You can import the types you need:

```typescript
import { DListClient, VoteData, DListError } from 'dlist-api-wrapper';
```

Available types:

- `DListClientOptions` - Options for the DListClient constructor
- `VoteData` - Structure of the vote data received from webhooks
- `CountPayload` - Payload for updating a bot's guild count
- `CompatCountPayload` - Payload for updating a bot's guild count (compatibility format)
- `DetailError` - Error response from the API
- `SetGuildCountResponse` - Response from setting a bot's guild count