import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../src/app/App';

test('opens on the Oswal Mart splash', async () => {
  jest.useFakeTimers();
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });

  expect(renderer!.root.findByProps({ testID: 'splash-screen' })).toBeTruthy();

  await ReactTestRenderer.act(() => {
    renderer.unmount();
  });
  jest.useRealTimers();
});
