import React, { useRef } from 'react';
import {
  FormLabel,
  FormMessage,
  useFormField,
  FormItem,
  FormField,
} from 'src/common/components/ui/common/Form/Form';
import Autocomplete from 'react-google-autocomplete';
import styles from './DefaultInput.module.css';
export interface CityInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  setCity: (city: string) => void;
  control: any;
}

const CityInput: React.FC<CityInputProps> = ({ control, setCity }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
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
            ref={inputRef}
            onPlaceSelected={e => {
              if (e && e.address_components && e.address_components.length > 0) {
                const longName = e.address_components[0].long_name;
                if (field.onChange) field.onChange(longName);
                setCity(longName);
                if (inputRef.current) inputRef.current.value = longName;
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
