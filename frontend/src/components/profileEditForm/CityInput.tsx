import React, { useEffect, useRef, useState } from 'react';
import {
  FormLabel,
  FormMessage,
  useFormField,
  FormItem,
  FormField,
} from 'src/components/ui/common/Form';
import Autocomplete from 'react-google-autocomplete';
import styles from './DefaultInput.module.css';
export interface CityInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setCity: (city: string) => void;
  control: any;
}

const CityInput: React.FC<CityInputProps> = ({ control, setCity, ...field }) => {
  const form = useFormField();
  return (
    <FormField
      control={control}
      name={'city'}
      render={({ field }) => (
        <FormItem className={styles.wrapper}>
          <FormLabel className={`${styles.label} ${field.value ? styles.active : ''}`}>
            City
          </FormLabel>
          <Autocomplete
            className={`${styles.input} ${useFormField().invalid ? styles.invalid : ''}`}
            placeholder=''
            apiKey={'AIzaSyBc69nuS10pB6M9fdKJt-hxdtVOd7V6Dlg'}
            language='en-GB'
            {...field}
            id='cityInput'
            onPlaceSelected={e => {
              const input = document.getElementById('cityInput');
              // @ts-ignore
              if (field.onChange) field.onChange(e.address_components[0].long_name);
              // @ts-ignore
              setCity(e.address_components[0].long_name);
              // @ts-ignore
              if (input) input.value = e.address_components[0].long_name;
            }}
          />
          <FormMessage className={styles.error} />
        </FormItem>
      )}
    />
  );
};

export default CityInput;
