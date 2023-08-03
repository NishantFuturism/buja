import React from 'react';
import { render } from 'react-testing-library';
const src = 'test.png';
const alt = 'test';
const renderComponent = (props = {}) =>
  render(<img referrerPolicy='no-referrer' src={src} alt={alt} {...props} />);
describe('<img  referrerPolicy="no - referrer" />', () => {
  it('should render an <img  referrerPolicy="no - referrer"> tag', () => {
    const { container } = renderComponent();
    const element = container.querySelector('img');
    expect(element).not.toBeNull();
  });
  it('should have an src attribute', () => {
    const { container } = renderComponent();
    const element = container.querySelector('img');
    expect(element.hasAttribute('src')).toBe(true);
  });
  it('should have an alt attribute', () => {
    const { container } = renderComponent();
    const element = container.querySelector('img');
    expect(element.hasAttribute('alt')).toBe(true);
  });
  it('should not have a class attribute', () => {
    const { container } = renderComponent();
    const element = container.querySelector('img');
    expect(element.hasAttribute('class')).toBe(false);
  });
  it('should adopt a className attribute', () => {
    const className = 'test';
    const { container } = renderComponent({ className });
    const element = container.querySelector('img');
    expect(element.className).toEqual(className);
  });
  it('should not adopt a srcset attribute', () => {
    const srcset = 'test-HD.png 2x';
    const { container } = renderComponent({ srcset });
    const element = container.querySelector('img');
    expect(element.hasAttribute('srcset')).toBe(false);
  });
});
