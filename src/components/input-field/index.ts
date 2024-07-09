import Block from "../../tools/Block";
import "./input-field.scss";

interface InputFieldProps {
  title: string;
  type: string;
  name: string;
  className?: string;
}

export default class InputField extends Block {
  constructor(props: InputFieldProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <div class="input-field{{#if className}} {{ className }}{{/if}}">
        <div class="input-field__title">{{ title }}</div>
        {{> Input className="input-field__element" type=type title=title name=name }}
      </div>
    `;
  }
}
