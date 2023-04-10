import {
  components, MultiValue, OptionProps, StylesConfig,
} from 'react-select';
import { Select } from './select';

interface SelectDropdownProps {
  defaultValue?: SelectDropdownOption | SelectDropdownOption[];
  value?: SelectDropdownOption;
  label?: string;
  required?: boolean;
  description?: string;
  styles?: StylesConfig;
  options: SelectDropdownOption[];
  isMulti?: boolean;
  placeholder?: string;
  onChange?: (option: SelectDropdownOption | MultiValue<SelectDropdownOption>) => void;
}

export interface SelectDropdownOption {
  id?: string;
  name: string;
  value: string;
  description?: string;
}

export const SelectDropdown = ({
  options, onChange, isMulti, defaultValue, value, placeholder
}: SelectDropdownProps) => (
  <div>
    <Select<SelectDropdownOption, boolean>
      components={{ Option }}
      defaultValue={defaultValue}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.value}
      isMulti={isMulti}
      onChange={(option) => { onChange?.(option as MultiValue<SelectDropdownOption>); }}
      options={options}
      value={value || undefined}
      placeholder={placeholder}
    />
  </div>
);

/**
 * Component responsible for displaying an option in the menu.
 */
const Option = (props: OptionProps<SelectDropdownOption>) => {
  const {
    children, data, isFocused, ...rest
  } = props;

  return (
    <components.Option data={data} isFocused={isFocused} {...rest}>
      <div>
        <div className="text-sm">{data.name}</div>
        {data?.description && <div className="text-xs">{data.description}</div>}
      </div>
    </components.Option>
  );
};
