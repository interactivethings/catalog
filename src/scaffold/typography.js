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
      margin: '0 0 13px 0',
      ...setType(theme, theme.fontL, 8)
    };
  case 2:
    return {
      ...style,
      margin: '0 0 16px 0',
      ...setType(theme, theme.fontM, 6)
    };
  case 3:
    return {
      ...style,
      margin: '0 0 6px 0',
      ...setType(theme, theme.fontS, 5)
    };
  default:
    return style;
  }
}
