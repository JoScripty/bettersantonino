import { NuqsAdapter } from 'nuqs/adapters/react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ScrollToTop from './components/ui/ScrollToTop';
import Services from './pages/Services';
import Document from './pages/Document';
import Government from './pages/Government';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Transparency from './pages/Transparency';
import Hotlines from './pages/Hotlines';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <NuqsAdapter>
          <div className="min-h-screen flex flex-col">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-primary-700 focus:shadow-lg"
            >
              Skip to main content
            </a>
            <Navbar />
            <ScrollToTop />
            <main id="main-content" className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services/:category" element={<Services />} />
                <Route path="/services" element={<Services />} />
                <Route
                  path="/services/:category/:documentSlug"
                  element={<Document categoryType="service" />}
                />
                <Route path="/government/:category" element={<Government />} />
                <Route path="/government" element={<Government />} />
                <Route
                  path="/government/:category/:documentSlug"
                  element={<Document categoryType="government" />}
                />
                <Route path="/search" element={<Search />} />
                <Route path="/about" element={<About />} />
                <Route path="/transparency" element={<Transparency />} />
                <Route
                  path="/transparency/:section"
                  element={<Transparency />}
                />
                <Route path="/hotlines" element={<Hotlines />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </NuqsAdapter>
      </Router>
    </HelmetProvider>
  );
}

export default App;
