import { expect } from 'chai';
import sinon from 'sinon';
import Router from './Router';
import Block, { IProps } from './Block';
import Route from './Route';

class TestBlock extends Block {
    constructor(props: IProps) {
      super(props);
    }
  
    render(): string {
      return '<div>{{content}}</div>';
    }
  }
  

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    router = new Router('#app'); 
  });

  afterEach(() => {
    sinon.restore(); 
  });

  describe('Создание экземпляра', () => {
    it('должен создать единственный экземпляр (синглтон)', () => {
      const secondInstance = new Router('#app');
      expect(router).to.equal(secondInstance);
    });
  });

  describe('Метод use', () => {
    it('должен бросить ошибку, если передан неверный блок', () => {
      expect(() => router.use('/test', {})).to.throw('Block for route /test is not a valid class');
    });
  });

  describe('Метод start', () => {
    it('должен вызвать _onRoute с текущим путем', () => {
      const onRouteSpy = sinon.spy(router as any, '_onRoute');
      router.start();
      expect(onRouteSpy.calledWith(window.location.pathname)).to.be.true;
    });

    it('должен установить обработчик события popstate', () => {
      const popstateHandler = sinon.spy();
      sinon.stub(window, 'onpopstate').value(popstateHandler);
      router.start();
      expect(window.onpopstate).to.not.be.null;
    });
  });

  describe('Метод _onRoute', () => {  
    it('должен вызвать leave для текущего маршрута перед переключением', () => {
      const route1 = new Route('/test1', TestBlock, { rootQuery: '#app' });
      const route2 = new Route('/test2', TestBlock, { rootQuery: '#app' });
  
      sinon.spy(route1, 'render');
      sinon.spy(route1, 'leave');
      sinon.spy(route2, 'render');
      sinon.spy(route2, 'leave');
  
      router.routes.push(route1, route2);
      (router as any)._onRoute('/test1');
      (router as any)._onRoute('/test2');
  
      expect((route1.leave as sinon.SinonSpy).calledOnce).to.be.true;
      expect((route2.render as sinon.SinonSpy).calledOnce).to.be.true;
    });
  
    it('должен вызвать handleNotFound для неизвестного маршрута', () => {
      const handleNotFoundSpy = sinon.spy(router as any, 'handleNotFound');
      (router as any)._onRoute('/unknown');
      expect(handleNotFoundSpy.calledOnce).to.be.true;
    });
  });
  

  describe('Метод go', () => {
    it('должен вызвать pushState и _onRoute с переданным путем', () => {
      const pushStateSpy = sinon.spy(window.history, 'pushState');
      const onRouteSpy = sinon.spy(router as any, '_onRoute');

      router.go('/test');
      expect(pushStateSpy.calledWith({}, '', '/test')).to.be.true;
      expect(onRouteSpy.calledWith('/test')).to.be.true;
    });
  });

  describe('Метод back', () => {
    it('должен вызвать history.back, если есть предыдущий маршрут', () => {
      const backSpy = sinon.spy(window.history, 'back');
      router.go('/test');
      router.back();
      expect(backSpy.calledOnce).to.be.true;
    });
  });

  describe('Метод forward', () => {
    it('должен вызвать history.forward', () => {
      const forwardSpy = sinon.spy(window.history, 'forward');
      router.forward();
      expect(forwardSpy.calledOnce).to.be.true;
    });
  });

  describe('Метод getRoute', () => {
    it('должен вернуть undefined, если маршрут не найден', () => {
      const route = router.getRoute('/unknown');
      expect(route).to.be.undefined;
    });
  });
});
