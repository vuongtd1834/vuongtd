import React from 'react'
import PropTypes from 'prop-types'

import {WindowScroller, List, AutoSizer, CellMeasurerCache} from 'react-virtualized'
import _ from 'lodash'

export default class LazyRender extends React.PureComponent {
  constructor(props) {
    super(props)
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 166
    });
  }
  static propTypes = {
    rowRender: PropTypes.func.isRequired,
    list: PropTypes.array,
  }

  static defaultProps = {
    list: [],
    rowHeight: 30
  }

  _windowScroller: ?WindowScroller;

  _setRef = windowScroller => {
    this._windowScroller = windowScroller;
  };

  componentWillReceiveProps(nextProps) {
    this.cache.clearAll()
  }

  updatePosition() {
    if (this._windowScroller) {
      this._windowScroller.updatePosition();
    }
  }

  render () {
    const {list, overscanRowCount} = this.props
    const result = this.props.rowHeight === -100 ? <WindowScroller ref={this._setRef} scrollElement={window}>
        {({height, isScrolling, registerChild, onChildScroll, scrollTop}) => (
          <AutoSizer disableHeight>
            {({width}) => (
              <div ref={registerChild}>
                <List
                  autoHeight
                  height={height}
                  width={width}
                  deferredMeasurementCache={this.cache}
                  rowHeight={this.cache.rowHeight}
                  rowCount={list.length}
                  overscanRowCount={overscanRowCount || 10}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  scrollTop={scrollTop}
                  rowRenderer={({index, key, style, parent}) => this.props.rowRender(list[index], key, style, index, parent, this.cache)}
                />
              </div>
            )}
          </AutoSizer>
        )}
      </WindowScroller> : <WindowScroller ref={this._setRef} scrollElement={window}>
      {({height, isScrolling, registerChild, onChildScroll, scrollTop}) => (
        <AutoSizer disableHeight>
          {({width}) => (
            <div ref={registerChild}>
              <List
                autoHeight
                height={height}
                width={width}
                rowCount={list.length}
                rowHeight={this.props.rowHeight}
                overscanRowCount={overscanRowCount || 10}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                rowRenderer={({ index, key, style }) => this.props.rowRender(list[index], key, style)}
              />
            </div>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
    return (
      result
    )
  }
}
