import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import DoctorTestimonials from '@/components/home/DoctorTestimonials';
import ProductBenefits from '@/components/home/ProductBenefits';
import ProductCategories from '@/components/home/ProductCategories';

import FlexFitHighlight from '@/components/home/FlexFitHighlight';
import ComboSection from '@/components/home/ComboSection';
import PhotoReviews from '@/components/home/PhotoReviews';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <FlexFitHighlight />
      <section id="benefits">
        <ProductBenefits />
      </section>
      <ProductCategories />
      <ComboSection />
      <DoctorTestimonials />
      <PhotoReviews />
    </div>
  );
}
