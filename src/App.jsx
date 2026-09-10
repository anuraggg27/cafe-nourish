import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';

import Home from './pages/Home';
import Menu from './pages/Menu';
import FoodDetail from './pages/FoodDetail';
import MealFinder from './pages/MealFinder';
import FoodFacts from './pages/FoodFacts';
import Approach from './pages/Approach';
import About from './pages/About';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<FoodDetail />} />
        <Route path="/meal-finder" element={<MealFinder />} />
        <Route path="/food-facts" element={<FoodFacts />} />
        <Route path="/approach" element={<Approach />} />
        <Route path="/about" element={<About />} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <AIAssistant />
    </>
  );
}

function NotFound() {
  return (
    <main className="min-h-screen bg-[#F8F6F1] pt-16 flex items-center justify-center">
      <div className="text-center px-6">
        <p className="text-6xl mb-6">🌿</p>
        <h1 className="font-serif text-[#24352A] text-4xl mb-4">Page not found.</h1>
        <p className="text-[#6F776F] mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-primary">Back to home</a>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
