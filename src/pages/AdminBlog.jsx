import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn } from '../utils/motion';
import { Navbar } from '../components';
import { blogService } from '../services/blogService';
import { useAuth } from '../contexts/AuthContext';

const AdminBlog = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [article, setArticle] = useState({
    title: '',
    description: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    tags: '',
    slug: '',
    image: null
  });

  useEffect(() => {
    fetchArticles();
    // Log l'ID de l'utilisateur
    console.log('User ID:', user?.id);
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await blogService.getPosts();
      if (error) throw error;
      setArticles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const handleNewArticle = () => {
    setArticle({
      title: '',
      description: '',
      content: '',
      metaTitle: '',
      metaDescription: '',
      tags: '',
      slug: '',
      image: null
    });
    setIsEditing(true);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await blogService.uploadImage(file);
        setArticle(prev => ({
          ...prev,
          featured_image: imageUrl
        }));
      } catch (err) {
        setError("Erreur lors de l'upload de l'image: " + err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);

    try {
      const formattedArticle = {
        title: article.title,
        slug: article.slug || article.title.toLowerCase().replace(/\s+/g, '-'),
        description: article.description,
        content: article.content,
        meta_title: article.metaTitle,
        meta_description: article.metaDescription,
        featured_image: article.featured_image,
        tags: article.tags.split(',').map(tag => tag.trim()),
        published: true
      };

      let savedArticle;
      if (article.id) {
        // Mise à jour d'un article existant
        savedArticle = await blogService.updatePost(article.id, formattedArticle);
      } else {
        // Création d'un nouvel article
        savedArticle = await blogService.createPost(formattedArticle);
      }

      // Mettre à jour la liste des articles
      setArticles(prev => {
        if (article.id) {
          return prev.map(a => a.id === savedArticle.id ? savedArticle : a);
        } else {
          return [savedArticle, ...prev];
        }
      });

      setIsEditing(false);
      setArticle({
        title: '',
        description: '',
        content: '',
        metaTitle: '',
        metaDescription: '',
        tags: '',
        slug: '',
        image: null
      });

    } catch (err) {
      setError("Erreur lors de la publication: " + err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEditArticle = (articleToEdit) => {
    setArticle({
      id: articleToEdit.id,
      title: articleToEdit.title,
      description: articleToEdit.description,
      content: articleToEdit.content,
      metaTitle: articleToEdit.meta_title,
      metaDescription: articleToEdit.meta_description,
      tags: articleToEdit.tags ? articleToEdit.tags.join(', ') : '',
      slug: articleToEdit.slug,
      featured_image: articleToEdit.featured_image
    });
    setIsEditing(true);
    setError(null);
  };

  const handleDeleteArticle = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await blogService.deletePost(id);
        setArticles(articles.filter(article => article.id !== id));
      } catch (err) {
        setError("Erreur lors de la suppression: " + err.message);
      }
    }
  };

  return (
    <div className="relative z-0 bg-primary min-h-screen">
      <Navbar />
      <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className={styles.sectionHeadText}>Administration du Blog</h1>
            <p className="text-secondary">
              Connecté en tant que {user?.email}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleNewArticle}
              className="bg-blue-600 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
            >
              Nouvel Article
            </button>
            <button
              onClick={handleSignOut}
              className="bg-red-600 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-900/50 text-red-200 p-4 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-20 flex justify-center">
            <p className="text-secondary text-[18px]">Chargement des articles...</p>
          </div>
        ) : (
          <>
            {isEditing && (
              <motion.form
                onSubmit={handleSubmit}
                variants={fadeIn("up", "spring", 0.3, 1)}
                className="mt-12 flex flex-col gap-8 bg-tertiary p-8 rounded-2xl"
              >
                {/* SEO Fields */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-white text-[20px] font-bold">SEO</h2>
                  <input
                    type="text"
                    name="metaTitle"
                    value={article.metaTitle}
                    onChange={handleChange}
                    placeholder="Meta Title (50-60 caractères)"
                    className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
                    maxLength="60"
                  />
                  <textarea
                    name="metaDescription"
                    value={article.metaDescription}
                    onChange={handleChange}
                    placeholder="Meta Description (150-160 caractères)"
                    className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
                    maxLength="160"
                  />
                  <input
                    type="text"
                    name="tags"
                    value={article.tags}
                    onChange={handleChange}
                    placeholder="Tags (séparés par des virgules)"
                    className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
                  />
                  <input
                    type="text"
                    name="slug"
                    value={article.slug}
                    onChange={handleChange}
                    placeholder="URL slug (ex: mon-article)"
                    className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
                  />
                </div>

                {/* Article Content */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-white text-[20px] font-bold">Contenu</h2>
                  <input
                    type="text"
                    name="title"
                    value={article.title}
                    onChange={handleChange}
                    placeholder="Titre de l'article"
                    className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
                    required
                  />
                  <input
                    type="text"
                    name="description"
                    value={article.description}
                    onChange={handleChange}
                    placeholder="Description courte"
                    className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
                    required
                  />
                  <textarea
                    name="content"
                    value={article.content}
                    onChange={handleChange}
                    placeholder="Contenu de l'article (Markdown supporté)"
                    className="bg-primary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium min-h-[400px]"
                    required
                  />
                  <div className="flex flex-col gap-2">
                    <label className="text-white">Image principale</label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="text-secondary"
                    />
                    {article.featured_image && (
                      <img
                        src={article.featured_image}
                        alt="Preview"
                        className="mt-2 max-h-[200px] rounded-lg"
                      />
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="bg-blue-600 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary disabled:opacity-50"
                  >
                    {submitLoading ? 'Publication...' : 'Publier l\'article'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
                  >
                    Annuler
                  </button>
                </div>
              </motion.form>
            )}

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <motion.div
                  key={article.id}
                  variants={fadeIn("up", "spring", 0.1, 1)}
                  className="bg-tertiary p-5 rounded-2xl"
                >
                  <h3 className="text-white font-bold text-[20px]">{article.title}</h3>
                  <p className="mt-2 text-secondary text-[14px]">
                    {article.meta_description || article.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-secondary text-[14px]">
                      {new Date(article.created_at).toLocaleDateString('fr-FR')}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditArticle(article)}
                        className="bg-blue-600 py-2 px-4 rounded-xl text-white text-sm"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="bg-red-600 py-2 px-4 rounded-xl text-white text-sm"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;
