import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});

// jsdom не реализует <dialog>.showModal()/.close() (нет рендерера,
// поэтому нет и модального поведения). Наши компоненты (DeleteModal,
// AddPhoto, StoriesModal) их вызывают в useEffect — без полифилла
// любой тест, где такой компонент рендерится, падает с
// "showModal is not a function".
if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute('open', '');
  };
}
if (!HTMLDialogElement.prototype.close) {
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute('open');
  };
}
