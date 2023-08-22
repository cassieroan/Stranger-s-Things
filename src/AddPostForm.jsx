import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAddPostMutation } from './api';

export function AddPostForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const history = useNavigate();
  const [addPost] = useAddPostMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Dispatch the action to add the post
    await addPost({
        post: {
            title, description, price,
        }
    }).unwrap();

    // Reset form fields
    setTitle('');
    setDescription('');
    setPrice('');

    // Navigate to a different route after submitting the form
    history('/posts'); // Change the route as needed
  };

    return (
        <Box>
            <h2>Add a Post</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    required
                />
                <TextField
                    label="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Add Post
                </Button>
            </form>
        </Box>
    );
}
