import React, { useMemo } from 'react';
import { View, TextInput, FlatList, ActivityIndicator, Text, StyleSheet, SafeAreaView, StatusBar, RefreshControl, Platform } from 'react-native';
import { usePosts } from '../hooks/usePosts';
import { usePersistentSearch } from '../hooks/usePersistentSearch';
import PostCard from '../components/PostCard';

const HomeScreen: React.FC = () => {
    const { posts, loading, error, refetch } = usePosts();
    const { searchText, updateSearchText, isLoaded } = usePersistentSearch();

    const filteredPosts = useMemo(() => {
        if (!searchText) return posts;
        return posts.filter(post =>
            post.title.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [posts, searchText]);

    if (!isLoaded) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search by title..."
                    value={searchText}
                    onChangeText={updateSearchText}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>

            {loading && posts.length === 0 ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : error ? (
                <View style={styles.center}>
                    <Text style={styles.errorText}>{error}</Text>
                    <Text style={styles.retryText} onPress={refetch}>Tap to retry</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredPosts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <PostCard post={item} />}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={refetch} />
                    }
                    ListEmptyComponent={
                        <View style={styles.center}>
                            <Text>No posts found.</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    searchContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#f9f9f9',
    },
    listContent: {
        padding: 16,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
        textAlign: 'center',
    },
    retryText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default HomeScreen;
