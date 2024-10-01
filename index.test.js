// index.test.js

const { CompleteOrder } = require('./index.js');
const modal = document.createElement('div');
modal.className = 'modal hidden';
document.body.appendChild(modal);

test('Should show the modal when "purchase-btn" is clicked', () => {
  const purchaseBtn = document.createElement('button');
  purchaseBtn.id = 'purchase-btn';
  document.body.appendChild(purchaseBtn);

  window.addEventListener = jest.fn();

  CompleteOrder();

  expect(window.addEventListener).toHaveBeenCalledWith(
    'click',
    expect.any(Function),
    { once: true }
  );

  purchaseBtn.click();

  expect(modal.classList.contains('hidden')).toBe(false);
});