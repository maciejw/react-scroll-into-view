import React from 'react';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';

export class ScrollIntoView<T extends HTMLElement> extends React.Component<ScrollIntoView.Props<T>> {
  childRef: React.RefObject<T>;

  constructor(props: ScrollIntoView.Props<T>, context: unknown) {
    super(props, context);
    this.childRef = React.createRef<T>();
    this.scrollIntoView = this.scrollIntoView.bind(this);
  }

  render() {
    return <>{this.props.children(this.childRef, this.scrollIntoView)}</>;
  }
  scrollIntoView() {
    if (this.childRef.current) {
      const { children, ...scrollIntoViewOptions } = this.props;

      scrollIntoView(this.childRef.current, {
        ...scrollIntoViewOptions,
        behavior: 'smooth',
        scrollMode: 'always',
        ease: (t: number) => --t * t * t + 1
      });
    }
  }
  static defaultProps = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  };
}
export namespace ScrollIntoView {
  export type Props<T extends HTMLElement> = {
    children: (ref: React.RefObject<T>, scrollIntoView: () => void) => React.ReactNode | React.ReactNode;
  } & Required<ScrollIntoViewOptions>;
}
