import React from 'react';
import './App.css';

import { Rectangles } from './Rectangles';
import { modelRoot, Grid } from './Grid';

class App extends React.Component<
  {},
  { block: ScrollLogicalPosition; inline: ScrollLogicalPosition; caseToShow: 'grid' | 'rectangles' }
> {
  handle: number | undefined;

  constructor(props: {}, context: unknown) {
    super(props, context);

    this.state = {
      block: 'center',
      inline: 'center',
      caseToShow: 'rectangles'
    };
  }
  componentDidMount() {
    const positions: Array<[ScrollLogicalPosition, ScrollLogicalPosition]> = [
      ['start', 'start'],
      ['center', 'center'],
      ['end', 'end'],
      ['start', 'end'],
      ['center', 'center'],
      ['end', 'start']
    ];
    let counter = 0;

    if (false) {
      this.handle = window.setInterval(() => {
        const [block, inline] = positions[counter % 6];
        this.setState({ block, inline });
        counter++;
      }, 1000);
    }
  }
  componentWillUnmount() {
    if (this.handle) {
      window.clearInterval(this.handle);
    }
  }

  render() {
    const { caseToShow } = this.state;
    return (
      <div className="App">
        <div style={{ position: 'fixed', top: '20px', left: '20px', backgroundColor: '#e0e0e099', padding: '10px' }}>
          <button onClick={() => this.setState({ caseToShow: 'rectangles' })}>rectangles</button>
          <button onClick={() => this.setState({ caseToShow: 'grid' })}>grid</button>
        </div>
        {caseToShow === 'rectangles' && (
          <Rectangles
            {...this.state}
            onChangeBlock={block => this.setState({ block })}
            onChangeInline={inline => this.setState({ inline })}
          />
        )}

        {caseToShow === 'grid' && <Grid model={modelRoot} />}
      </div>
    );
  }
}

export default App;
