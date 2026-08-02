import { executeQuery } from './shopifyClient';

export interface ProductImage {
  id: string;
  url: string;
  altText: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: string;
  available: boolean;
  sku?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  price: string;
  compareAtPrice?: string;
  image: ProductImage;
  images: ProductImage[];
  variants: ProductVariant[];
  tags: string[];
}

export interface ProductsResponse {
  products: {
    edges: Array<{
      node: Product;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                }
                available
                sku
              }
            }
          }
          tags
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const fetchProducts = async (first = 20, after?: string): Promise<ProductsResponse> => {
  return executeQuery<ProductsResponse>(PRODUCTS_QUERY, { first, after });
};

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
        }
      }
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
            }
            available
            sku
          }
        }
      }
      tags
    }
  }
`;

export const fetchProductByHandle = async (handle: string): Promise<{ productByHandle: Product }> => {
  return executeQuery<{ productByHandle: Product }>(PRODUCT_BY_HANDLE_QUERY, { handle });
};

const SEARCH_PRODUCTS_QUERY = `
  query SearchProducts($query: String!, $first: Int!) {
    search(query: $query, first: $first, types: PRODUCT) {
      edges {
        node {
          ... on Product {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 1) {
              edges {
                node {
                  id
                  url
                  altText
                }
              }
            }
            tags
          }
        }
      }
    }
  }
`;

export const searchProducts = async (query: string, first = 20): Promise<{ search: { edges: Array<{ node: Product }> } }> => {
  return executeQuery<{ search: { edges: Array<{ node: Product }> } }>(SEARCH_PRODUCTS_QUERY, { query, first });
};
