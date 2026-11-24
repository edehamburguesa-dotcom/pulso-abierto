import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ListPage } from './pages/ListPage';
import { DetailPage } from './pages/DetailPage';
import { NotFoundPage } from './pages/NotFoundpage';

export default function App() {
  return (
    <>
      <Header />
      <main id="main" className="container main-content">
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/criptomonedas/:id" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}