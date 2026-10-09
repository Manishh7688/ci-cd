import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { ProductCard } from '../src/components/ui/ProductCard';
import { products } from '../src/features/catalog/data';

test('product card adds the selected pack', async () => {
  const onAdd = jest.fn();
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(
      <ProductCard
        product={products[0]}
        quantityFor={() => 0}
        onQuantity={jest.fn()}
        onPress={jest.fn()}
        onAdd={onAdd}
        addLabel="ADD"
        offLabel="Off"
      />,
    );
  });

  const add = renderer!.root.findByProps({ testID: 'add-soap-neem' });
  await ReactTestRenderer.act(() => {
    add.props.onPress();
  });
  expect(onAdd).toHaveBeenCalledWith('75g');
});
