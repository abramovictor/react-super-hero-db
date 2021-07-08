import { useCallback } from 'react';
import { useLatest } from 'react-use';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const noop = () => {};

export const VirtualizedList = props => {
  const { itemCount, itemSize, renderItem = noop } = props;
  const latestRenderItem = useLatest(renderItem);

  const renderRow = useCallback(({ index, isScrolling, style }) => (
    <div style={style}>
      {latestRenderItem.current({ index, isScrolling })}
    </div>
  ), []);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List useIsScrolling width={width} height={height} itemCount={itemCount} itemSize={itemSize}>
          {renderRow}
        </List>
      )}
    </AutoSizer>
  );
};

if (process.env.NODE_ENV !== 'production') {
  VirtualizedList.displayName = 'VirtualizedList';
}
