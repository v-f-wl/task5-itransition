'use client'
import translations from '@/locale';
import { useRequestsContext } from '@/providers/requests-context';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';


const marks = [
  {
    value: -1,
    label: '-',
  },
  {
    value: 0,
    label: '0',
  },
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 9,
    label: '9',
  },
];

export default function DiscreteSlider() {
  const context = useRequestsContext()
  if (!context) {
    throw new Error("useRequestsContext must be used within a RequestsContextProvider")
  }
  
  const { setRatingQuery, language } = context

  const handleChangeValue = useCallback(
    debounce((event: Event,) => {
      const target = event.target as HTMLInputElement
      setRatingQuery(Number(target.value))
    }, 500),
  [])

  useEffect(() => {
    return () => {
      handleChangeValue.cancel()
    }
  }, [handleChangeValue])

  return (
    <Box sx={{ width: 300 }}>
      <div className="">{translations[language].likes}:</div>
      <Slider
        aria-label="Temperature"
        defaultValue={-1}
        onChange={handleChangeValue}
        valueLabelDisplay="off"
        shiftStep={0.5}
        step={0.5}
        marks={marks}
        min={-1}
        max={10}
      />
    </Box>
  );
}
