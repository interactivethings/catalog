function setType(theme, {fontSize, verticalUnits}) {
  return {
    fontSize,
    lineHeight: (verticalUnits * theme.baseVerticalUnit) / fontSize
  };
}

export function text(theme, {level}) {
  let style = {
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 300
  };

  switch (level) {
  case 1:
    return {
      ...style,
      ...setType(theme, {fontSize: theme.fontL, verticalUnits: 8}),
      margin: '0 0 13px 0'
    };
  case 2:
    return {
      ...style,
      ...setType(theme, {fontSize: theme.fontM, verticalUnits: 6}),
      margin: '0 0 16px 0'
    };
  case 3:
    return {
      ...style,
      ...setType(theme, {fontSize: theme.fontS, verticalUnits: 5}),
      margin: '0 0 6px 0'
    };
  default:
    return style;
  }
}
