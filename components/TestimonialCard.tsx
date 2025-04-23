import { Testimonial } from '@/constants/testimonials'

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-rose-50 p-6 rounded-xl relative">
      {/* Quote marks */}
      <span className="absolute top-4 left-4 text-rose-300 text-4xl font-serif"></span>
      
      <p className="text-slate-700 italic mb-6 pl-8 pt-4">
        {testimonial.quote}
      </p>
      
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-rose-200 flex items-center justify-center mr-4">
          <span className="text-rose-600 text-xl">{testimonial.name.charAt(0)}</span>
        </div>
        <div>
          <h4 className="font-medium text-rose-900">{testimonial.name}</h4>
          <p className="text-sm text-rose-600">{testimonial.location}</p>
        </div>
      </div>
    </div>
  )
}