import { Box, Typography, Card, CardContent, TextField } from '@mui/material';
import { useGetPostsQuery } from './api'
import { useState } from 'react';

export function PostsPage() {
  const { data: envelope, isLoading, isError, error } = useGetPostsQuery();
  const [search, setSearch] = useState("")

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>{error.toString()}</div>
  }

  // unwrap the envelope
  const posts = envelope.data.posts;

  // filter by search input
  const filtered_posts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.description.toLowerCase().includes(search.toLowerCase()) ||
    post.author.username.toLowerCase().includes(search.toLowerCase()) ||
    post.location.toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <Box>
      <Box marginBottom={2}>
        <Typography variant="h4">Posts</Typography>
        <TextField
          label="Search Posts" variant="standard"
          value={search}
          onChange={evt => setSearch(evt.target.value)}
        />
      </Box>
      
      <Box display="flex" flexDirection="column" gap={2}>
        { filtered_posts.map(post => (
          <Card elevation={3} key={post._id}>
            <CardContent>
              <Typography variant="h5">{post.title}</Typography>
              <Typography variant="subtitle1" color="gray">{post.description}</Typography>
              <div>
                <Typography variant="body1" fontWeight="bold" component="span">
                  Price:
                </Typography>
                {" "}
                <Typography variant="body1" component="span">
                  {post.price}
                </Typography>
              </div>
              <div>
                <Typography variant="body1" fontWeight="bold" component="span">
                  Seller:
                </Typography>
                {" "}
                <Typography variant="body1" component="span">
                  {post.author.username}
                </Typography>
              </div>
              <div>
                <Typography variant="body1" fontWeight="bold" component="span">
                  Location:
                </Typography>
                {" "}
                <Typography variant="body1" component="span">
                  {post.location}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

