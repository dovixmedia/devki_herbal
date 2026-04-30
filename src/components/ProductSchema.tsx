interface ProductSchemaProps {
  product: {
    name: string;
    description: string;
    price: number;
    images?: string[];
    rating?: number;
    reviewCount?: number;
  };
  url?: string;
}

export default function ProductSchema({ product, url }: ProductSchemaProps) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    ...(url && { url }),
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    ...(product.images?.[0] && { image: product.images[0] }),
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount ?? 0,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
