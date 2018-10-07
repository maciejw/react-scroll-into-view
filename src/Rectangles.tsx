import React from 'react';
import { ScrollIntoView } from './ScrollIntoView';

function isScrollLogicalPosition(position: string): position is ScrollLogicalPosition {
  return position === 'start' || position === 'center' || position === 'end' || position === 'nearest';
}

const ScrollLogicalPositionSelector: React.SFC<{
  label: string;
  value: ScrollLogicalPosition;
  onChange: (value: ScrollLogicalPosition) => void;
}> = ({ label, value, onChange }) => {
  return (
    <label style={{ margin: '10px' }}>
      {label}
      <select
        style={{ margin: '3px' }}
        value={value}
        onChange={e => {
          const { value } = e.target;
          if (isScrollLogicalPosition(value)) {
            onChange(value);
          }
        }}
      >
        <option value="start">start</option>
        <option value="center">center</option>
        <option value="end">end</option>
        <option value="nearest">nearest</option>
      </select>
    </label>
  );
};

export const Rectangles: React.SFC<{
  block: ScrollLogicalPosition;
  inline: ScrollLogicalPosition;
  onChangeBlock: (block: ScrollLogicalPosition) => void;
  onChangeInline: (inline: ScrollLogicalPosition) => void;
}> = ({ block, inline, onChangeBlock, onChangeInline }) => (
  <ScrollIntoView<HTMLDivElement> block={block} inline={inline} behavior="smooth">
    {(ref, scrollIntoView) => (
      <>
        <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#e0e0e099', padding: '10px' }}>
          <ScrollLogicalPositionSelector label="block" value={block} onChange={onChangeBlock} />
          <ScrollLogicalPositionSelector label="inline" value={inline} onChange={onChangeInline} />
          <button onClick={scrollIntoView}>Scroll</button>
        </div>

        <div
          style={{
            width: '300px',
            height: '300px',
            margin: '200px',
            overflow: 'scroll',
            backgroundColor: 'blue'
          }}
        >
          <div style={{ width: '650px', height: '650px' }}>
            <div
              style={{ width: '250px', height: '250px', margin: '200px', overflow: 'scroll', backgroundColor: 'green' }}
            >
              <div style={{ width: '600px', height: '600px' }}>
                <div
                  style={{
                    width: '200px',
                    height: '200px',
                    margin: '200px',
                    overflow: 'scroll',
                    backgroundColor: 'yellow'
                  }}
                >
                  <div style={{ width: '550px', height: '550px' }}>
                    <div
                      style={{
                        width: '150px',
                        height: '150px',
                        margin: '200px',
                        overflow: 'scroll',
                        backgroundColor: 'orange'
                      }}
                    >
                      <div style={{ width: '500px', height: '500px' }}>
                        <div
                          style={{ width: '100px', height: '100px', margin: '200px', backgroundColor: 'red' }}
                          ref={ref}
                        >
                          Some text inside an element.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )}
  </ScrollIntoView>
);
