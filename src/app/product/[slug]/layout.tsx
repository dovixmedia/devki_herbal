import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return {
    title: `${title} | Wellness`,
    description: `${title} - Premium wellness supplement from Wellness. Clean ingredients, great taste.`,
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
