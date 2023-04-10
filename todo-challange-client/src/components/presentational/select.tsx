import { useMemo } from 'react';
import ReactSelect, {
  GroupBase,
  Props,
  SelectInstance,
  StylesConfig,
} from 'react-select';

export interface SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends Props<Option, IsMulti, Group> {
  innerRef?: React.Ref<SelectInstance<Option, IsMulti, Group>>;
  value?: Option;
  [key: string]: unknown;
}

export function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: SelectProps<Option, IsMulti, Group>): React.ReactElement {
  const {
    styles = {}, innerRef, ...rest
  } = props;
  const style = useMemo(() => ({
    ...customStyles<Option, IsMulti, Group>(), ...styles
  }), [styles]);

  return (
    <ReactSelect
      ref={innerRef}
      styles={style}
      {...rest}
    />
  );
}

function customStyles<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(): StylesConfig<Option, IsMulti, Group> {
  return {
    // control,
    // singleValue,
    // clearIndicator
    // container

    control: (provided) => ({
      ...provided,
      borderWidth: '0.125rem',
    }),

    // dropdownIndicator
    // group
    // groupHeading
    // indicatorsContainer
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    // input
    // loadingIndicator
    // loadingMessage

    menu: (provided) => ({
      ...provided,
      marginTop: '0.3125rem',
      border: '0.125rem solid hsl(0, 0%, 60%)',
    }),

    menuList: (provided) => ({
      ...provided,
      maxHeight: '11.25rem',
      paddingTop: '0.5rem',
    }),
    // menuPortal
    // multiValue
    // multiValueLabel
    // multiValueRemove
    // noOptionsMessage
    option: (provided) => ({
      ...provided,
      padding: '0.85rem 1rem',
      lineHeight: 1.2,
    }),
    // placeholder
    // singleValue
    valueContainer: (provided) => ({
      ...provided,
      padding: '0.65rem 1rem',
      lineHeight: '1',
    }),
  };
}
