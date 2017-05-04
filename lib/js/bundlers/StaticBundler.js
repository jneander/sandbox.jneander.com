import 'normalize.css';
import 'styles/index.css';

export function bundle (config) {
  const $app = document.getElementById('app');

  config.render($app);

  if (module.hot) {
    module.hot.accept(config.render);
  }
}
