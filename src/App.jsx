import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { About, Contact, Experience, Feedbacks,
Hero, Navbar, Tech, Works, StarsCanvas, Services, Blog } from './components';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AdminBlog from './pages/AdminBlog';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

const HomePage = () => {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <About />
      <Services />
      <Experience />
      <Tech />
      <Works />
      <Blog />
      <Feedbacks />
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route 
            path="/admin/blog" 
            element={
              <PrivateRoute>
                <AdminBlog />
              </PrivateRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
