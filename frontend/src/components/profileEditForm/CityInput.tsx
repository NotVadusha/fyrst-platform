import React, { useRef, useState } from 'react';
import styles from './DefaultInput.module.css';
import {
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
  FormField,
} from 'src/components/ui/common/Form';
import Autocomplete from 'react-google-autocomplete';

export interface CityInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label: string;
  setCity: (city: string) => void;
}

const CityInput: React.FC<CityInputProps> = ({ control, label, setCity }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  return (
    <FormField
      control={control}
      name={'city'}
      render={({ field }) => (
        <FormItem className={styles.wrapper}>
          <FormLabel className={`${styles.label} ${field.value ? styles.active : ''}`}>
            {label}
          </FormLabel>
          <Autocomplete
            className={`${styles.input} ${useFormField().invalid ? styles.invalid : ''}`}
            placeholder=''
            apiKey={'AIzaSyBc69nuS10pB6M9fdKJt-hxdtVOd7V6Dlg'}
            language='en-GB'
            id='cityInput'
            onPlaceSelected={e => {
              const SelectedCity = String(e.address_components[0].long_name);
              if (SelectedCity) {
                setCity(SelectedCity);
                // @typescript-eslint/ban-ts-comment
                // @ts-ignore
                document.getElementById('cityInput').value = SelectedCity;
              }
            }}
          />
          <FormMessage className={styles.error} />
        </FormItem>
      )}
    />
  );
};

export default CityInput;
