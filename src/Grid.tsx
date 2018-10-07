import React from 'react';

import { ScrollIntoView } from './ScrollIntoView';

function* generate(max: number) {
  let i = 0;
  while (i < max) {
    yield i++;
  }
}

export const modelRoot = [...generate(30)].map(id => {
  return { id, expanded: false };
});

type Model = typeof modelRoot;
type GridProps = { model: Model };

type RowProps = {
  id: number;
  expanded: boolean;
  click: (id: number) => void;
  animationEnd: () => void;
  innerRef?: React.Ref<HTMLDivElement>;
};

class RowInner extends React.Component<RowProps> {
  render() {
    const { id, expanded, click, animationEnd, innerRef } = this.props;
    return (
      <div
        onAnimationEnd={e => {
          animationEnd();
        }}
        ref={innerRef}
        style={{
          border: 'solid 1px black',
          height: 'auto',
          transition: 'height 2s ease-in-out'
        }}
        onClick={() => {
          click(id);
          animationEnd();
        }}
      >
        {expanded ? <div style={{ height: '300px' }}>{id}</div> : id.toString()}
      </div>
    );
  }
}

const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => <RowInner {...props} innerRef={ref} />);

type GridState = { model: Model };

export class Grid extends React.Component<GridProps, GridState> {
  constructor(props: GridProps, context: {}) {
    super(props, context);
    this.state = { model: this.props.model };
  }

  render() {
    const { model } = this.state;
    return model.map(i => (
      <ScrollIntoView<HTMLDivElement> key={i.id} block={'center'} inline={'center'}>
        {(ref, scrollIntoView) => (
          <Row
            id={i.id}
            expanded={i.expanded}
            ref={ref}
            animationEnd={scrollIntoView}
            click={id => {
              const m = model.map(i => {
                if (i.id === id) {
                  return { ...i, expanded: !i.expanded };
                }
                return { ...i, expanded: false };
              });
              this.setState({ model: m });
            }}
          />
        )}
      </ScrollIntoView>
    ));
  }
}
