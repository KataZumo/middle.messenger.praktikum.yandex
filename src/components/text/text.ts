import Block from "../../tools/Block";

export default class TextComponent extends Block {
    constructor(props: { text: string, className: string }) {
      super(props);
    }
  
    setText(text: string) {
      this.setProps({ text });
    }
  
    render() {
      return `
        <div class="${this.props.className}">
          ${this.props.text}
        </div>
      `;
    }
  }
