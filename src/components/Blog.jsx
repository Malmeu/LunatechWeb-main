import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { fadeIn } from '../utils/motion';
import { blogService } from '../services/blogService';

const BlogCard = ({ title, description, image, date, author, slug }) => (
  <motion.div
    variants={fadeIn("up", "spring", 0.3, 0.75)}
    className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
  >
    {image && (
      <div className='relative w-full h-[230px]'>
        <img
          src={image}
          alt={title}
          className='w-full h-full object-cover rounded-2xl'
        />
      </div>
    )}

    <div className='mt-5'>
      <h3 className='text-white font-bold text-[24px]'>{title}</h3>
      <p className='mt-2 text-secondary text-[14px]'>{description}</p>
    </div>

    <div className='mt-4 flex justify-between items-center'>
      <div className='flex items-center gap-1'>
        {author?.avatar_url && (
          <img
            src={author.avatar_url}
            alt={author.full_name}
            className='w-10 h-10 rounded-full object-cover'
          />
        )}
        <div>
          <p className='text-white text-[14px]'>{author?.full_name}</p>
          <p className='text-secondary text-[12px]'>{date}</p>
        </div>
      </div>
      <Link
        to={`/blog/${slug}`}
        className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
      >
        <div className='w-1/2 h-1/2 object-contain'>→</div>
      </Link>
    </div>
  </motion.div>
);

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await blogService.getRecentPosts(3);
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
        <div className="mt-20 flex justify-center">
          <p className="text-secondary text-[18px]">Chargement des articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
        <div className="mt-20 flex justify-center">
          <p className="text-secondary text-[18px]">Une erreur est survenue : {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <motion.div variants={fadeIn("up", "spring", 0.1, 1)}>
        <p className={styles.sectionSubText}>Nos derniers articles</p>
        <h2 className={styles.sectionHeadText}>Blog</h2>
      </motion.div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {articles.map((article, index) => (
          <BlogCard
            key={article.id}
            index={index}
            title={article.title}
            description={article.description}
            image={article.featured_image}
            date={new Date(article.created_at).toLocaleDateString('fr-FR')}
            author={article.profiles}
            slug={article.slug}
          />
        ))}
      </div>

      {articles.length > 0 && (
        <div className="mt-10 flex justify-center">
          <Link
            to="/blog"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            Voir tous les articles
          </Link>
        </div>
      )}
    </div>
  );
};

export default Blog;
