import translations from '@/locale';
import { useRequestsContext } from '@/providers/requests-context';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

const ReviewsInput = () => {
  const context = useRequestsContext()
  if (!context) {
    console.error("Something went wront, please reload the page");
    return <div className=""></div>
  }
  
  const { reviewsQuery, setReviewsQuery, language } = context
  const [inputValue, setInputValue] = useState(reviewsQuery)
  
  const updateReviews = useCallback(
    debounce((newSeed: number) => {
      setReviewsQuery(newSeed);
    }, 500),
  [])

  useEffect(() => {setInputValue(reviewsQuery)}, [reviewsQuery])

  useEffect(() => {
    return () => {
      updateReviews.cancel()
    }
  }, [updateReviews])

  const handleChange = (event: SelectChangeEvent) => {
    setReviewsQuery(Number(event.target.value))
    setInputValue(Number(event.target.value))
  };
  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="reviews-select-label">{translations[language].reviews}:</InputLabel>
        <Select
          labelId="reviews-select-label"
          id="reviews-select"
          value={inputValue.toString()}
          label="Language"
          onChange={handleChange}
        >
          <MenuItem value={'-1'}>All</MenuItem>
          <MenuItem value={'0'}>0</MenuItem>
          <MenuItem value={'0.5'}>0.5</MenuItem>
          <MenuItem value={'1'}>1</MenuItem>
          <MenuItem value={'1.5'}>1.5</MenuItem>
          <MenuItem value={'2'}>2</MenuItem>
          <MenuItem value={'2.5'}>2.5</MenuItem>
          <MenuItem value={'3'}>3</MenuItem>
          <MenuItem value={'3.5'}>3.5</MenuItem>
          <MenuItem value={'4'}>4</MenuItem>
          <MenuItem value={'4.5'}>4.5</MenuItem>
          <MenuItem value={'5'}>5</MenuItem>
          <MenuItem value={'5.5'}>5.5</MenuItem>
          <MenuItem value={'6'}>6</MenuItem>
          <MenuItem value={'6.5'}>6.5</MenuItem>
          <MenuItem value={'7'}>7</MenuItem>
          <MenuItem value={'7.5'}>7.5</MenuItem>
          <MenuItem value={'8'}>8</MenuItem>
          <MenuItem value={'8.5'}>8.5</MenuItem>
          <MenuItem value={'9'}>9</MenuItem>
          <MenuItem value={'9.5'}>9.5</MenuItem>
          <MenuItem value={'10'}>10</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default ReviewsInput