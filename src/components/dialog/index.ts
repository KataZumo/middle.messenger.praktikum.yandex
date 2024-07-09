import Block from "../../tools/Block";
import "./dialog.scss";

interface DialogProps {}

export default class Dialog extends Block {
  constructor(props: DialogProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <div class="dialog">
        {{> @partial-block }}
      </div>
    `;
  }
}
