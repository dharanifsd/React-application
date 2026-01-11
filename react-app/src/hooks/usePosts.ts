import { useState, useEffect, useCallback } from 'react';
import { Post, fetchPosts } from '../services/api';

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchPosts();
            setPosts(data);
        } catch (err) {
            setError('Unable to fetch posts. Check your network connection.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    return { posts, loading, error, refetch: loadPosts };
};
