import { expect } from 'chai';
import Block from './Block';

describe('Block', () => {

  it('рендер Handlebars', () => {
    class TestBlock extends Block {
      render(): string {
        return '<div>{{text}}</div>';
      }
    }

    const testBlock = new TestBlock();
    testBlock.getContent();
    expect(testBlock.element?.innerHTML).to.equal('Hello, World!');
  });
});
