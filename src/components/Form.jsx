import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, TextareaAutosize, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Select, MenuItem, Checkbox, Button, Grid } from '@mui/material';
import './Form.css'; // Import custom CSS file for form styling

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  country: yup.string().required('Country is required'),
  gender: yup.string().required('Gender is required'),
  hobbies: yup.array().min(1, 'Select at least one hobby'),
});

const countries = [
  { value: 'usa', label: 'USA' },
  { value: 'uk', label: 'UK' },
  { value: 'canada', label: 'Canada' },
  // Add more countries as needed
];

const hobbies = [
  { value: 'reading', label: 'Reading' },
  { value: 'sports', label: 'Sports' },
  { value: 'music', label: 'Music' },
  // Add more hobbies as needed
];

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      country: '',
      gender: '',
      hobbies: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="filled"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            className="form-field"
          />
        </Grid>

        <Grid item xs={12}>
          <TextareaAutosize
            id="address"
            name="address"
            minRows={3}
            placeholder="Address"
            className="form-field textarea"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl variant="filled" error={formik.touched.country && Boolean(formik.errors.country)} fullWidth>
            <FormLabel>Country</FormLabel>
            <Select
              id="country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              className="form-field"
            >
              <MenuItem value="">Select Country</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.value} value={country.value}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.country && formik.errors.country && (
              <div className="error">{formik.errors.country}</div>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset" error={formik.touched.gender && Boolean(formik.errors.gender)}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              id="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              className="form-field"
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
            {formik.touched.gender && formik.errors.gender && (
              <div className="error">{formik.errors.gender}</div>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl error={formik.touched.hobbies && Boolean(formik.errors.hobbies)}>
            <FormLabel component="legend">Hobbies</FormLabel>
            {hobbies.map((hobby) => (
              <FormControlLabel
                key={hobby.value}
                control={
                  <Checkbox
                    name="hobbies"
                    value={hobby.value}
                    checked={formik.values.hobbies.includes(hobby.value)}
                    onChange={formik.handleChange}
                  />
                }
                label={hobby.label}
              />
            ))}
            {formik.touched.hobbies && formik.errors.hobbies && (
              <div className="error">{formik.errors.hobbies}</div>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" className="submit-button">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
