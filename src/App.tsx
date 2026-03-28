import { useState, useEffect } from 'react';
import { Github, Search, Star, ShieldCheck, Zap, ExternalLink, Code2, User, BookOpen, ChevronRight, CheckCircle2, Calendar } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  updated_at: string;
}

export default function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://api.github.com/users/dysnei-feder/repos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Sort by recently updated
          const sorted = data.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
          setRepos(sorted);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredRepos = repos.filter(repo => 
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-bg-light font-sans text-text-dark">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="https://avatars.githubusercontent.com/u/271532505?v=4" 
              alt="Dysnei Feder" 
              className="w-10 h-10 rounded-full border-2 border-primary"
            />
            <span className="text-xl font-bold text-primary tracking-tight">Dysnei<span className="text-secondary">Feder</span></span>
          </div>
          <nav className="hidden md:flex gap-6 font-medium text-text-darker">
            <a href="#about" className="hover:text-primary transition-colors">Über mich</a>
            <a href="#research" className="hover:text-primary transition-colors">Forschung</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projekte</a>
          </nav>
          <a href="https://github.com/dysnei-feder" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-text-darker hover:text-primary transition-colors">
            <Github size={20} />
            <span className="hidden sm:inline font-medium">GitHub</span>
          </a>
        </div>
      </header>

      {/* Hero Search Section (Vergleichsportal Style) */}
      <section className="bg-primary pt-16 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-6 leading-tight">
            Forschung & Projekte <br className="hidden md:block" />
            <span className="text-accent-light">transparent vergleichen</span>
          </h1>
          <p className="text-center text-white/90 mb-8 text-lg">
            Finde Analysen, Datensammlungen und Code-Repositories zu gesellschaftlichen Phänomenen.
          </p>
          
          <div className="bg-white p-2 md:p-3 rounded-lg shadow-xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center bg-gray-50 rounded border border-gray-200 px-4 py-3 md:py-0">
              <Search className="text-gray-400 mr-3" size={20} />
              <input 
                type="text" 
                placeholder="Z.B. Fakenews, Niendorf, Antimatter..." 
                className="w-full bg-transparent outline-none text-text-darker placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-secondary hover:bg-orange-600 text-white font-bold py-3 md:py-4 px-8 rounded transition-colors flex items-center justify-center gap-2">
              Projekte finden <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center md:justify-between gap-4 text-sm font-medium text-text-darker">
            <div className="flex items-center gap-2"><ShieldCheck className="text-primary" size={18} /> 100% Open Source</div>
            <div className="flex items-center gap-2"><Zap className="text-secondary" size={18} /> Radical Progressor*in</div>
            <div className="flex items-center gap-2"><Star className="text-accent-medium" size={18} /> Biggest Star Wars Fan Girl</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar (About & Research Areas) */}
        <aside className="w-full lg:w-1/3 space-y-8">
          {/* About Me Card */}
          <div id="about" className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-primary text-white px-6 py-4 flex items-center gap-3">
              <User size={20} />
              <h2 className="font-bold text-lg">Über mich</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-center mb-4">
                <img 
                  src="https://avatars.githubusercontent.com/u/271532505?v=4" 
                  alt="Dysnei Feder" 
                  className="w-32 h-32 rounded-full border-4 border-bg-light shadow-sm"
                />
              </div>
              <p className="text-text-darker leading-relaxed">
                Als <strong className="text-primary">Radical progressor*in</strong> kämpfe ich für eine bessere Welt. Mein Ansatz ist es, an die Wurzeln der Ungerechtigkeit zu gehen. Ich setze mich bedingungslos für Gleichberechtigung und wahre Freiheit ein.
              </p>
              <div className="pt-4 border-t border-gray-100">
                <a href="https://github.com/dysnei-feder" target="_blank" rel="noreferrer" className="text-secondary font-semibold hover:underline flex items-center gap-1 justify-center">
                  Zum GitHub Profil <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Research Areas Card */}
          <div id="research" className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-primary text-white px-6 py-4 flex items-center gap-3">
              <BookOpen size={20} />
              <h2 className="font-bold text-lg">Forschungsschwerpunkte</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent-medium shrink-0 mt-0.5" size={18} />
                  <span className="text-text-darker">Mediale Desinformation & Fake-News Strukturen</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent-medium shrink-0 mt-0.5" size={18} />
                  <span className="text-text-darker">Mathematische Anomalien & Wahrscheinlichkeiten</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent-medium shrink-0 mt-0.5" size={18} />
                  <span className="text-text-darker">Gesellschaftliche Ungerechtigkeit & Radikaler Fortschritt</span>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Projects List (Comparison Style) */}
        <div id="projects" className="w-full lg:w-2/3">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-text-darker">
              Verfügbare Repositories <span className="text-gray-400 text-lg font-normal">({filteredRepos.length} Treffer)</span>
            </h2>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-200">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-500">Lade Repositories von GitHub...</p>
              </div>
            ) : filteredRepos.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-200">
                <p className="text-gray-500">Keine Repositories für diese Suche gefunden.</p>
              </div>
            ) : (
              filteredRepos.map((repo) => (
                <div key={repo.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col md:flex-row">
                  {/* Left Side: Info */}
                  <div className="p-6 flex-1 border-b md:border-b-0 md:border-r border-gray-100">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-primary break-words pr-4">
                        {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
                      </h3>
                    </div>
                    <p className="text-text-darker mb-4 text-sm leading-relaxed">
                      {repo.description || "Keine Beschreibung verfügbar."}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      {repo.language && (
                        <span className="flex items-center gap-1 bg-bg-light px-2 py-1 rounded">
                          <Code2 size={14} /> {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> Aktualisiert: {new Date(repo.updated_at).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Right Side: Action (Comparison Portal Style) */}
                  <div className="p-6 md:w-64 bg-gray-50 flex flex-col justify-center items-center text-center shrink-0">
                    <div className="mb-4 flex items-center gap-1 text-yellow-500 font-bold">
                      <Star size={18} className="fill-current" />
                      <span>{repo.stargazers_count} Stars</span>
                    </div>
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full bg-secondary hover:bg-orange-600 text-white font-bold py-3 px-4 rounded transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                      Zum Repository <ExternalLink size={16} />
                    </a>
                    <span className="text-xs text-gray-400 mt-3 flex items-center gap-1">
                      <ShieldCheck size={12} /> Sicher via GitHub
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-bg-very-dark text-white pt-12 pb-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Dysnei<span className="text-secondary">Feder</span></h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Radical progressor*in, fighting for a better world by getting to the root of injustice. Committed to equality and true freedom.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Navigation</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#about" className="hover:text-secondary transition-colors">Über mich</a></li>
                <li><a href="#research" className="hover:text-secondary transition-colors">Forschungsschwerpunkte</a></li>
                <li><a href="#projects" className="hover:text-secondary transition-colors">Projekte & Repositories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Kontakt</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <a href="https://github.com/dysnei-feder" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
                  <Github size={16} /> github.com/dysnei-feder
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Mitstreiter</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <a href="https://github.com/hartmannlauterbach" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
                  <Github size={16} /> hartmannlauterbach
                </a>
                <a href="https://github.com/sigridfuhrenkamp-cyber" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
                  <Github size={16} /> sigridfuhrenkamp-cyber
                </a>
                <a href="https://github.com/mrbloxx" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
                  <Github size={16} /> mrbloxx
                </a>
                <a href="https://github.com/entwicklerkatze" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
                  <Github size={16} /> entwicklerkatze
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-gray-500 text-xs">
            <p>&copy; {new Date().getFullYear()} Dysnei Feder. Design inspiriert von Vergleichsportalen & vrh-celle.de.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
