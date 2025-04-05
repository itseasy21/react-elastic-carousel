import React from "react";
import PropTypes from "prop-types";
import { useSwipeable } from "react-swipeable";
import { cssPrefix } from "../utils/helpers";
import ItemWrapperContainer from "./ItemWrapperContainer";
import consts from "../consts";

const Track = ({
  children,
  childWidth,
  autoTabIndexVisibleItems,
  enableSwipe = true,
  enableMouseSwipe = true,
  preventDefaultTouchmoveEvent = false,
  itemsToShow,
  itemsToScroll,
  currentItem,
  itemPosition = consts.CENTER,
  itemPadding = [0, 0, 0, 0],
  onSwiped,
  onSwiping,
  verticalMode,
  onItemClick
}) => {
  const width = `${childWidth}px`;
  const paddingStyle = `${itemPadding.join("px ")}px`;
  const minVisibleItem = currentItem;
  const maxVisibleItem = currentItem + itemsToShow;
  const prevItem = minVisibleItem - itemsToScroll;
  const nextItem = maxVisibleItem + itemsToScroll;

  const originalChildren = React.Children.map(children, (child, idx) => {
    const isVisible = idx >= minVisibleItem && idx < maxVisibleItem;
    const isPrevItem = !isVisible && idx >= prevItem && idx < currentItem;
    const isNextItem = !isVisible && idx < nextItem && idx > currentItem;
    const itemClass = "carousel-item";

    const childToRender = autoTabIndexVisibleItems
      ? React.cloneElement(child, {
          tabIndex: isVisible ? 0 : -1
        })
      : child;
    return (
      <div
        className={cssPrefix(
          itemClass,
          `${itemClass}-${idx}`,
          `${itemClass}-${isVisible ? "visible" : "hidden"}`,
          isPrevItem && `${itemClass}-prev`,
          isNextItem && `${itemClass}-next`
        )}
      >
        <ItemWrapperContainer
          id={idx}
          $itemPosition={itemPosition}
          style={{ width, padding: paddingStyle }}
          key={idx}
          onClick={onItemClick}
        >
          {childToRender}
        </ItemWrapperContainer>
      </div>
    );
  });

  const swipeHandler = useSwipeable({
    stopPropagation: true,
    preventDefaultTouchmoveEvent,
    trackMouse: enableMouseSwipe,
    onSwiped,
    onSwiping
  });

  const toRender = enableSwipe ? (
    <div
      style={{
        display: "flex",
        flexDirection: verticalMode ? "column" : "row"
      }}
      className={cssPrefix("swipable")}
      {...swipeHandler}
    >
      {originalChildren}
    </div>
  ) : (
    originalChildren
  );
  return toRender;
};

Track.propTypes = {
  children: PropTypes.array.isRequired,
  itemsToShow: PropTypes.number.isRequired,
  noAutoTabbedItems: PropTypes.bool,
  currentItem: PropTypes.number.isRequired,
  itemPosition: PropTypes.string,
  itemPadding: PropTypes.array,
  childWidth: PropTypes.number,
  verticalMode: PropTypes.bool,
  enableSwipe: PropTypes.bool,
  enableMouseSwipe: PropTypes.bool,
  preventDefaultTouchmoveEvent: PropTypes.bool,
  onSwiped: PropTypes.func,
  onSwiping: PropTypes.func,
  onItemClick: PropTypes.func
};

export default Track;
