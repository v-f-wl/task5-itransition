'use client'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { useRequestsContext } from '@/providers/requests-context';
import translations, { LanguageType } from '@/locale';

export default function SelectLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const context = useRequestsContext();
  if (!context) {
    console.error("Something went wront, please reload the page");
    return <div className=""></div>
  }
  const { setLanguage, language } = context;

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedLanguage(event.target.value as string);
    setLanguage(event.target.value as LanguageType)
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{translations[language].language}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedLanguage}
          label="Language"
          onChange={handleChange}
        >
          <MenuItem value={'en'}>English</MenuItem>
          <MenuItem value={'de'}>Deutsch</MenuItem>
          <MenuItem value={'ru'}>Русский</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
