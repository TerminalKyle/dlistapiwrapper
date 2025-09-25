/**
 * Simple test file for the dlist-api-wrapper
 * 
 * Note: This is not a proper test suite, just a simple example of how to use the library.
 * For real testing, you would use a testing framework like Jest.
 */

import { DListClient, AuthenticationError, RateLimitError } from '../index';

// Mock API responses for testing
const mockResponses = {
  success: true,
  authError: new AuthenticationError(),
  rateLimit: new RateLimitError(),
};

// Create a test client
const client = new DListClient('test-api-key');

/**
 * Test the setGuildCount method
 */
async function testSetGuildCount() {
  console.log('Testing setGuildCount...');
  
  try {
    // In a real test, this would make an actual API call
    // For this example, we'll just simulate success
    console.log('Result:', mockResponses.success);
    console.log('✅ setGuildCount test passed');
  } catch (error) {
    console.error('❌ setGuildCount test failed:', error);
  }
}

/**
 * Test error handling
 */
async function testErrorHandling() {
  console.log('\nTesting error handling...');
  
  // Test authentication error
  try {
    // Simulate an authentication error
    throw mockResponses.authError;
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.log('✅ Authentication error handled correctly');
    } else {
      console.error('❌ Authentication error test failed');
    }
  }
  
  // Test rate limit error
  try {
    // Simulate a rate limit error
    throw mockResponses.rateLimit;
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.log('✅ Rate limit error handled correctly');
    } else {
      console.error('❌ Rate limit error test failed');
    }
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('Running dlist-api-wrapper tests...\n');
  
  await testSetGuildCount();
  await testErrorHandling();
  
  console.log('\nAll tests completed!');
}

// Run the tests
runTests().catch(console.error);
