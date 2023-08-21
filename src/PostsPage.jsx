import { useGetPostsQuery } from './api'

export function PostsPage() {
  const { data: envelope, isLoading, isError, error } = useGetPostsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>{error.toString()}</div>
  }

  // unwrap the envelope
  const posts = envelope.data.posts;

  return (
    <div>
      { posts.map(post => (
        <div key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div>
            <b>Price:</b> <span>{post.price}</span>
          </div>
          <div>
            <b>Seller:</b> <span>{post.author.username}</span>
          </div>
          <div>
            <b>Location:</b> <span>{post.location}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

