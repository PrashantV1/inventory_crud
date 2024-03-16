import React from 'react';
import { Button, Stack, TextField } from '@mui/material';

const DialogeBox = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} margin={2}>
        <TextField
          required
          error={formData.name.length === 0}
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          label="Name"
          name="name"
        />
        <TextField
          required
          error={formData.code.length === 0}
          value={formData.code}
          onChange={handleChange}
          variant="outlined"
          label="Code"
          name="code"
        />
        <TextField
          required
          error={formData.currency.length === 0}
          value={formData.currency}
          onChange={handleChange}
          variant="outlined"
          label="Currency"
          name="currency"
        />
        <TextField
          required
          error={formData.price.length === 0}
          value={formData.price}
          onChange={handleChange}
          variant="outlined"
          label="Price"
          name="price"
        />
        <TextField
          required
          error={formData.origin.length === 0}
          value={formData.origin}
          onChange={handleChange}
          variant="outlined"
          label="Origin"
          name="origin"
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default DialogeBox;
