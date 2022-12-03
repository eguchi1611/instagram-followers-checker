import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { FC, TextareaHTMLAttributes } from "react";

type Props = {
  text: string;
  inputProps: TextareaHTMLAttributes<HTMLTextAreaElement>;
};

const InputForm: FC<Props> = ({ text, inputProps }) => {
  return (
    <FormControl>
      <FormLabel>{text}</FormLabel>
      <Textarea rows={5} {...inputProps} />
    </FormControl>
  );
};

export default InputForm;
