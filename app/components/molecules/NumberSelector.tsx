import { Select, SelectProps } from "@chakra-ui/react";
import { FC } from "react";

interface NumberSelectProps extends Omit<SelectProps, 'children'> {
  min: number
  max: number
}

export const NumberSelector: FC<NumberSelectProps> = ({ min, max, ...props }) => (
  <Select {...props}>
    {Array.from({ length:max - min + 1}, (_, i) => i+ min).map(num => (
      <option key={num} value={num}>{num}</option>
    ))}
  </Select>
)
