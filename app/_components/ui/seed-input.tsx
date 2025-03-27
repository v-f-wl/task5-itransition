'use client'
import { useRequestsContext } from '@/providers/requests-context';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { debounce } from "lodash";
import IRandom from '../icons/random-icon';

const SeedInput = () => {
  const context = useRequestsContext()
  if (!context) {
    console.error("Something went wront, please reload the page");
    return <div className=""></div>
  }
  const {  seed, setSeed, randomSeed } = context
  // const [inputValue, setInputValue] = useState(seed)

  // useEffect(() => {
  //   setInputValue(prev => seed)
  // }, [seed])

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '180px' } }}
      noValidate 
      autoComplete="off"
      className='flex items-center'
    >
      <TextField 
        id="outlined-basic" 
        type="number" 
        value={seed}
        label='Seed' 
        variant="outlined" 
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const newSeed = Number(event.target.value);
          // setInputValue(prev => newSeed)
          setSeed(prev => newSeed)
        }}
      />
      <div 
        onClick={randomSeed}
        className="cursor-pointer max-w-9 p-2"
      >
        <IRandom/>
      </div>
    </Box>
  );
}

export default SeedInput