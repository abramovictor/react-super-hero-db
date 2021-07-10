import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const noop = () => {};

const ListItem = props => {
  const { data, index, isScrolling, style } = props;
  console.log({ data });
  const { list, renderItem } = data;


  return (
    <div style={style}>
      {renderItem({ item: list[index], index, isScrolling })}
    </div>
  );
};

export const VirtualizedList = props => {
  const {
    data,
    itemHeight,
    className,
    renderItem = noop,
  } = props;

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          className={className}
          useIsScrolling
          width={width}
          height={height}
          itemCount={data.length}
          itemSize={itemHeight}
          itemData={{ list: data, renderItem }}
        >
          {ListItem}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

if (process.env.NODE_ENV !== 'production') {
  VirtualizedList.displayName = 'VirtualizedList';
}
