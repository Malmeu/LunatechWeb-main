import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { Navbar } from '../components';
import { blogService } from '../services/blogService';

const BlogCard = ({ post, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.75)}
    className="w-full md:w-[48%] lg:w-[31%] bg-tertiary rounded-2xl p-5"
  >
    <div className="relative w-full h-[230px] bg-black-100 rounded-2xl overflow-hidden">
      {post.featured_image ? (
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-secondary text-[20px]">🚀</p>
        </div>
      )}
    </div>

    <div className="mt-5">
      <h3 className="text-white font-bold text-[24px]">{post.title}</h3>
      <p className="mt-2 text-secondary text-[14px]">{post.meta_description}</p>
    </div>

    <div className="mt-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        {post.profiles?.avatar_url && (
          <img
            src={post.profiles.avatar_url}
            alt={post.profiles.full_name}
            className="w-8 h-8 rounded-full"
          />
        )}
        <div>
          <p className="text-white text-[14px]">{post.profiles?.full_name}</p>
          <p className="text-secondary text-[12px]">{post.created_at}</p>
        </div>
      </div>
      <Link
        to={`/blog/${post.slug}`}
        className="text-gradient text-[14px] font-bold"
      >
        Lire la suite
      </Link>
    </div>

    {post.tags && post.tags.length > 0 && (
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag, tagIndex) => (
          <span
            key={tagIndex}
            className="bg-black-200 text-secondary text-[12px] px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
  </motion.div>
);

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await blogService.getPosts();
        setArticles(data);

        // Extraire tous les tags uniques
        const tags = new Set();
        data.forEach(article => {
          if (article.tags) {
            article.tags.forEach(tag => tags.add(tag));
          }
        });
        setAllTags(Array.from(tags));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.meta_description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || (article.tags && article.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="relative z-0 bg-primary">
      <Navbar />
      <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Découvrez nos derniers articles</p>
          <h1 className={styles.sectionHeadText}>Blog.</h1>
        </motion.div>

        <div className="mt-10 flex flex-col md:flex-row gap-5">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un article..."
            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium flex-1"
          />
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="bg-tertiary py-4 px-6 text-white rounded-lg outline-none border-none font-medium md:w-[200px]"
          >
            <option value="">Tous les tags</option>
            {allTags.map((tag, index) => (
              <option key={index} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="mt-20 flex justify-center">
            <p className="text-secondary text-[18px]">Chargement des articles...</p>
          </div>
        ) : error ? (
          <div className="mt-20 flex justify-center">
            <p className="text-secondary text-[18px]">Une erreur est survenue : {error}</p>
          </div>
        ) : (
          <div className="mt-20 flex flex-wrap justify-start gap-7">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <BlogCard key={article.id} post={article} index={index} />
              ))
            ) : (
              <div className="w-full flex justify-center">
                <p className="text-secondary text-[18px]">
                  Aucun article ne correspond à votre recherche.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
