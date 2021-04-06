function moveDown(count, ref, list) {
    ref.current.scrollToIndex({
      index: count + 1,
      align,
      behavior,
    });
    //use list[count].id to change in db
    return count < list.length - 1 ? count + 1 : count;
  }

  function moveUp(count, ref) {
    ref.current.scrollToIndex({
      index: count - 1,
      align,
      behavior,
    });
    //use list[count].id to change in db
    return count > 0 ? count - 1 : count;
  }

  function prevKeyword(count, checkedItems, keywords) {
    if (count > 0) {
      setCheckedItems({
        ...checkedItems,
        [keywords[count]]: false,
        [keywords[count - 1]]: true,
      });
      return count - 1;
    }
    return count;
  }

  function accept(array, index) {
    array[index].status = 1;
    setInsights(array);
  }

  function decline(array) {
    array[0].status = -1;
    setInsights(array);
  }

  function nextKeyword(count, checkedItems, keywords) {
    if (count < keywords.length - 1) {
      setCheckedItems({
        ...checkedItems,
        [keywords[count]]: false,
        [keywords[count + 1]]: true,
      });
      return count + 1;
    }
    return count;
  }

  // useHotkeys('s', () =>
  //   setCount(prevCount => moveDown(prevCount, virtuoso, insights)),
  //   {},
  //   [insights]
  // );

  // useHotkeys('w', () =>
  //   setCount(prevCount => moveUp(prevCount, virtuoso)),
  //   {},
  //   [insights]
  // );

  // useHotkeys("a", () =>
  //   setKeyCount(prevCount => prevKeyword(prevCount, checkedItems, keywords)),
  //   {},
  //   [checkedItems, keywords]
  // )

  // useHotkeys("d", () =>
  //   setKeyCount(prevCount => nextKeyword(prevCount, checkedItems, keywords)),
  //   {},
  //   [checkedItems, keywords]
  // )

  // useHotkeys("r", () =>
  //   setInsights(prevArray => accept(prevArray, count),
  //   {},
  //   [count])
  // )

  // useHotkeys("t", () =>
  //   setInsights(prevArray => decline(prevArray))
  // )