import { FixedSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const noop = () => {};

const GridCell = props => {
  const { data, columnIndex, rowIndex, isScrolling, style } = props;
  const { of, list, renderItem } = data;

  const index = (rowIndex * of) + columnIndex;

  if (index > list.length - 1) {
    return null;
  }

  return (
    <div style={style}>
      {renderItem({ item: list[index], index, isScrolling })}
    </div>
  );
};

const defaultKeyExtractor = ({ index }) => index;

export const VirtualizedGrid = props => {
  const {
    data,
    of,
    rowHeight,
    className,
    keyExtractor = defaultKeyExtractor,
    renderItem = noop,
  } = props;

  const itemKey = ({ columnIndex, data, rowIndex }) => {
    const { of, list } = data;

    const index = (rowIndex * of) + columnIndex;
    return keyExtractor({ item: list[index], index });
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeGrid
          className={className}
          useIsScrolling
          width={width}
          height={height}
          columnCount={of}
          columnWidth={(width / of) - (17 / of)}
          rowCount={Math.ceil(data.length / of)}
          rowHeight={rowHeight}
          itemData={{ list: data, of, renderItem }}
          itemKey={itemKey}
        >
          {GridCell}
        </FixedSizeGrid>
      )}
    </AutoSizer>
  );
};

if (process.env.NODE_ENV !== 'production') {
  VirtualizedGrid.displayName = 'VirtualizedGrid';
}
