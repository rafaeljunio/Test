import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form'


interface InputProps  {
  name: string;
  label?: string;
  value?: any
  error?: FieldError
  onChange?: any
  onBlur?: any
  disabled?:boolean
}

const InputBase:ForwardRefRenderFunction<HTMLInputElement, InputProps>  = ({name, label, error = null, ...rest}, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel style={{fontSize: '10px'}} htmlFor={name}>{label}</FormLabel> }

      <input
        style={{backgroundColor: '#f2f2f2', border: '1px solid #ccc', padding: '5px', fontSize: '13px', width: '100%'}}
        name={name}
        id={name}
        ref={ref}
        {...rest}
      />

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

export const Input  = forwardRef(InputBase)
