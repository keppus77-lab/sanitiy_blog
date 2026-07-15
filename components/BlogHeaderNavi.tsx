export default function BlogHeaderNavi() {
  return (
   <header className="bg-white/80 backdrop-blur-lg border-b border-green-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
                {/* Logo */}
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    W
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Waldarbeit.Blog</h1>
                    <p className="text-xs text-gray-600">Professionell & Nachhaltig</p>
                </div>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                <a href="#" className="text-green-700 font-semibold transition-colors">Start</a>
                <a href="#" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Blog</a>
                <a href="#" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Kategorien</a>
                <a href="#" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Über mich</a>
                <a href="#" className="text-gray-700 hover:text-green-700 font-medium transition-colors">Kontakt</a>
                <button className="hidden sm-di px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all hover:shadow-lg font-medium">
                    Newsletter
                </button>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2 text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                </button>
            </div>
            </div>
        </header>
  )
}