import { supabase } from '../lib/supabase';
import { marked } from 'marked';

export const blogService = {
  async getPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error };
  },

  async getRecentPosts(limit = 3) {
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(*)')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return { data, error };
  },

  async getPostBySlug(slug) {
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(*)')
      .eq('slug', slug)
      .single();

    if (error) throw error;

    // Convertir le contenu Markdown en HTML
    if (data) {
      data.content = marked(data.content);
    }

    return data;
  },

  async createPost(post) {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          ...post,
          author_id: userData.user.id,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updatePost(id, post) {
    const { data, error } = await supabase
      .from('posts')
      .update(post)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deletePost(id) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  async uploadImage(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },
};
