import { Handler } from '@netlify/functions';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dl0v24jj',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const { name, email, category, message } = JSON.parse(event.body || '{}');

    if (!name || !email || !category || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'All fields are required' }),
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid email format' }),
      };
    }

    await client.create({
      _type: 'contactSubmission',
      name,
      email,
      category,
      message,
      submittedAt: new Date().toISOString(),
      status: 'new',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully!' }),
    };
  } catch (error) {
    console.error('Error creating submission:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send message' }),
    };
  }
};
