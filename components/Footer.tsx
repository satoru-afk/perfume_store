import { FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-rose-900 text-rose-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-serif text-rose-300">✦</span>
              <span className="text-xl font-light text-white">The Little Scent</span>
            </div>
            <p className="font-caveat text-xl text-rose-200">
              It is only with the heart that one can see rightly; what is essential is invisible to the eye.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-rose-200 hover:text-white transition-colors">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-rose-200 hover:text-white transition-colors">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-rose-200 hover:text-white transition-colors">
              <FaPinterest className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-rose-800 mt-8 pt-8 text-center text-rose-300 text-sm">
          <p>© {new Date().getFullYear()} The Little Scent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
