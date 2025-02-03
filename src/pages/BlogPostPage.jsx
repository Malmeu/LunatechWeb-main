import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn } from '../utils/motion';
import { Navbar } from '../components';
import { blogService } from '../services/blogService';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await blogService.getPostBySlug(slug);
        setPost(postData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return (
    <div className="relative z-0 bg-primary">
      <Navbar />
      <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
        {loading ? (
          <div className="mt-20 flex justify-center">
            <p className="text-secondary text-[18px]">Chargement de l'article...</p>
          </div>
        ) : error ? (
          <div className="mt-20 flex justify-center">
            <p className="text-secondary text-[18px]">Une erreur est survenue : {error}</p>
          </div>
        ) : post ? (
          <motion.div
            variants={fadeIn("up", "spring", 0.1, 1)}
            className="mt-10"
          >
            <Link
              to="/blog"
              className="text-secondary hover:text-white transition-colors"
            >
              ← Retour aux articles
            </Link>

            <article className="mt-10">
              {post.featured_image && (
                <div className="w-full h-[400px] rounded-2xl overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="mt-8">
                <h1 className={styles.sectionHeadText}>{post.title}</h1>
                
                <div className="mt-4 flex items-center gap-4">
                  {post.profiles?.avatar_url && (
                    <img
                      src={post.profiles.avatar_url}
                      alt={post.profiles.full_name}
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                  <div>
                    <p className="text-white text-[16px]">{post.profiles?.full_name}</p>
                    <p className="text-secondary text-[14px]">{post.created_at}</p>
                  </div>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-tertiary text-secondary text-[14px] px-4 py-2 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div 
                  className="mt-8 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </article>
          </motion.div>
        ) : (
          <div className="mt-20 flex justify-center">
            <p className="text-secondary text-[18px]">Article non trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;
