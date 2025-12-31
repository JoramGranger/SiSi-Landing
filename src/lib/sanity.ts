import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'dl0v24jj';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const token = import.meta.env.VITE_SANITY_WRITE_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2024-01-01',
});

export const writeClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2025-01-31',
  token,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
