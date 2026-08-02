import axios from 'axios';

const SHOPIFY_STORE_URL = import.meta.env.VITE_SHOPIFY_STORE_URL || '';
const STOREFRONT_API_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';

export const shopifyClient = axios.create({
  baseURL: `${SHOPIFY_STORE_URL}/api/2024-01/graphql.json`,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': STOREFRONT_API_TOKEN,
  },
});

export interface ShopifyError {
  message: string;
  extensions?: {
    code: string;
  };
}

export interface ShopifyResponse<T> {
  data?: T;
  errors?: ShopifyError[];
}

export const executeQuery = async <T,>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await shopifyClient.post<ShopifyResponse<T>>('', {
      query,
      variables,
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0]?.message || 'GraphQL error');
    }

    return response.data.data as T;
  } catch (error) {
    console.error('Shopify API error:', error);
    throw error;
  }
};
