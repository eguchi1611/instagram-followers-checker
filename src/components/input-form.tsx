import { FormControl, FormLabel, Textarea, VStack } from "@chakra-ui/react";
import { FC, ReactPropTypes, TextareaHTMLAttributes } from "react";

type Props = {
  text: string;
  inputProps: TextareaHTMLAttributes<HTMLTextAreaElement>;
};

const InputForm: FC<Props> = ({ text, inputProps }) => {
  return (
    <FormControl>
      <FormLabel>{text}</FormLabel>
      <Textarea {...inputProps} />
    </FormControl>
  );
};

export default InputForm;
