export default function Footer(props) {
return (
<footer className="bg-gray-900 text-gray-400 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* Brand */}
                <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                    W
                    </div>
                    <span className="text-white font-bold text-lg">Waldarbeit.Blog</span>
                </div>
                <p className="text-sm leading-relaxed mb-4">
                    Deine Quelle für professionelles Wissen über moderne Forstwirtschaft, 
                    nachhaltige Waldbewirtschaftung und Arbeitssicherheit.
                </p>
                <p className="text-xs">
                    © 2026 Waldarbeit.Blog – Alle Rechte vorbehalten
                </p>
                </div>

                {/* Quick Links */}
                <div>
                <h3 className="text-white font-semibold mb-4">Schnellzugriff</h3>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-green-400 transition-colors">Über uns</a></li>
                    <li><a href="#" className="hover:text-green-400 transition-colors">Kontakt</a></li>
                    <li><a href="#" className="hover:text-green-400 transition-colors">Impressum</a></li>
                    <li><a href="#" className="hover:text-green-400 transition-colors">Datenschutz</a></li>
                </ul>
                </div>

                {/* Social */}
                <div>
                <h3 className="text-white font-semibold mb-4">Folge uns</h3>
                <div className="flex gap-3">
                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                    <span className="text-lg">📱</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                    <span className="text-lg">🐦</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                    <span className="text-lg">📺</span>
                    </a>
                </div>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-center">
                <p className="text-sm">
                Made with 🌲 in Franken
                </p>
            </div>
            </div>
        </footer>
)
}