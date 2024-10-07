import { expect } from 'chai';
import sinon from 'sinon';
import Block, { IProps } from './Block';

class TestBlock extends Block {
  render(): string {
    return '<div>{{content}}</div>';
  }
}

describe('Block', () => {
  describe('Создание экземпляра', () => {
    it('должен создаваться без ошибок', () => {
      const block = new TestBlock(); 
      expect(block).to.be.instanceOf(Block);
    });
  });

  describe('Обработка пропсов', () => {
    it('должен правильно устанавливать и получать пропсы', () => {
      const props: IProps = { testProp: 'value' };
      const block = new TestBlock(props); 
      expect(block.props.testProp).to.equal('value');
    });

    it('должен вызывать componentDidUpdate при обновлении пропсов', () => {
      const block = new TestBlock({ testProp: 'initial' });
      const componentDidUpdateSpy = sinon.spy(block, 'componentDidUpdate');
      block.setProps({ testProp: 'updated' });
      expect(componentDidUpdateSpy.calledOnce).to.be.true;
      componentDidUpdateSpy.restore();
    });
  });

  describe('Управление событиями', () => {
    it('должен добавлять обработчики событий', () => {
      const onClick = sinon.spy();
      const props: IProps = {
        events: {
          click: onClick,
        },
      };
      const block = new TestBlock(props); 
      const element = block.getContent();
      expect(element).to.not.be.null;
      element?.dispatchEvent(new window.Event('click'));
      expect(onClick.calledOnce).to.be.true;
    });

    it('должен удалять обработчики событий при обновлении элемента', () => {
      const onClick = sinon.spy();
      const props: IProps = {
        events: {
          click: onClick,
        },
      };
      const block = new TestBlock(props);
      const element = block.getContent();
      expect(element).to.not.be.null;
      block.setProps({ someProp: 'newValue' }); 
      element?.dispatchEvent(new window.Event('click'));
      expect(onClick.calledTwice).to.be.false;
    });
  });

  describe('Обработка атрибутов', () => {
    it('должен устанавливать атрибуты на элементе', () => {
      const props: IProps = {
        attr: {
          id: 'test-id',
          class: 'test-class',
        },
      };
      const block = new TestBlock(props); 
      const element = block.getContent();
      expect(element?.getAttribute('id')).to.equal('test-id');
      expect(element?.getAttribute('class')).to.equal('test-class');
    });
  });

  describe('Рендеринг', () => {
    it('должен рендерить шаблон с пропсами', () => {
      const props: IProps = { content: 'Hello World' };
      const block = new TestBlock(props); 
      const element = block.getContent();
      expect(element?.outerHTML).to.equal('<div>Hello World</div>');
    });

    it('должен обновлять элемент при изменении пропсов', () => {
      const props: IProps = { content: 'Initial' };
      const block = new TestBlock(props); 
      block.setProps({ content: 'Updated' });
      const element = block.getContent();
      expect(element?.outerHTML).to.equal('<div>Updated</div>');
    });
  });

  describe('Методы жизненного цикла', () => {
    it('должен вызывать componentDidMount после инициализации', () => {
      const componentDidMountSpy = sinon.spy(Block.prototype, 'componentDidMount');
      const block = new TestBlock(); 
      block.dispatchComponentDidMount(); 
      expect(componentDidMountSpy.calledOnce).to.be.true;
      componentDidMountSpy.restore();
    });

    it('должен вызывать componentDidUnmount при размонтировании', () => {
      const componentDidUnmountSpy = sinon.spy(Block.prototype, 'componentDidUnmount' as keyof TestBlock);
      const block = new TestBlock();
      block.dispatchComponentDidUnmount();
      expect(componentDidUnmountSpy.calledOnce).to.be.true;
      componentDidUnmountSpy.restore();
    });
  });

  describe('Дочерние компоненты', () => {
    class ChildBlock extends Block {
      render(): string {
        return '<span>Child</span>';
      }
    }

    class ParentBlock extends Block {
      render(): string {
        return '<div>{{{child}}}</div>';
      }
    }

    it('должен рендерить дочерние компоненты', () => {
      const child = new ChildBlock();
      const parent = new ParentBlock({ child });
      const element = parent.getContent();
      expect(element?.outerHTML).to.equal('<div><span>Child</span></div>');
    });
  });

  describe('Методы видимости', () => {
    it('должен отображать элемент', () => {
      const block = new TestBlock(); 
      block.hide();
      block.show();
      const element = block.getContent();
      expect(element?.style.display).to.equal('block');
    });

    it('должен скрывать элемент', () => {
      const block = new TestBlock();
      block.hide();
      const element = block.getContent();
      expect(element?.style.display).to.equal('none');
    });
  });
});
