import { Controller, useFormContext } from 'react-hook-form';

import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>({
  name,
  label,
  placeholder,
  helperText,
  ...other
}: Omit<Props<string, Multiple, DisableClearable, FreeSolo>, 'renderInput' | 'options'>) {
  const { control, setValue } = useFormContext();

  const { placePredictions, getPlacePredictions } = usePlacesService({
    apiKey: 'AIzaSyC2UQBWd-kkALximl2gxxBxuVTJ9rE2b7w',
    debounce: 300,
    options: {
      //@ts-ignore
      LocationBias: 'au',
    },
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option}>
                {option}
              </li>
            );
          }}
          onChange={(event, newValue) => {
            setValue(name, newValue, { shouldValidate: true });
          }}
          onInputChange={(_, newValue) => {
            getPlacePredictions({ input: newValue });
          }}
          renderInput={(params) => (
            <TextField
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
            />
          )}
          options={placePredictions.map((item) => {
            return item.description;
          })}
          {...other}
        />
      )}
    />
  );
}
