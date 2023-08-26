import React, { useEffect, useRef, useState } from 'react';
import styles from './DefaultInput.module.css';
import { FormLabel, FormMessage, useFormField } from 'src/components/ui/common/Form';
import Autocomplete from 'react-google-autocomplete';

export interface CityInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const CityInput: React.FC<CityInputProps> = ({ ...field }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const form = useFormField();
  return (
    <div>
      <FormLabel className={`${styles.label} ${field.value ? styles.active : ''}`}>City</FormLabel>
      <Autocomplete
        className={`${styles.input} ${form.invalid ? styles.invalid : ''}`}
        placeholder=''
        apiKey={'AIzaSyBc69nuS10pB6M9fdKJt-hxdtVOd7V6Dlg'}
        language='en-GB'
        {...field}
        onPlaceSelected={e => {
          console.log(e);
        }}
        id='cityInput'
      />
      <FormMessage className={styles.error} />
    </div>
  );
};

export default CityInput;
