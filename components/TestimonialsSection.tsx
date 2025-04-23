import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/constants/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-rose-900 mb-4">
            Whispers from the Stars
          </h2>
          <p className="text-rose-700 max-w-2xl mx-auto">
            What our celestial travelers say about their fragrant journeys
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
