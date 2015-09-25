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


export function heading(theme, {level}) {
  let style = {
    color: theme.brandColor,
    fontFamily: theme.fontHeading,
    fontStyle: 'normal',
    fontWeight: 500
  };

  switch (level) {
  case 1:
    return {
      ...style,
      ...setType(theme, {fontSize: theme.fontXxl, verticalUnits: 12}),
      margin: '0 0 16px 0',
      textTransform: 'uppercase',
      fontWeight: 600
    };
  case 2:
    return {
      ...style,
      ...setType(theme, {fontSize: theme.fontXl, verticalUnits: 8}),
      margin: '0 0 12px 0'
    };
  case 3:
    return {
      ...style,
      ...setType(theme, {fontSize: theme.fontL, verticalUnits: 6}),
      margin: '23px 0 2px 0',
      color: theme.textMedium
    };
  case 4:
    return {
      ...style,
      ...setType(theme, {fontSize: theme.fontM, verticalUnits: theme.baseLineMulti}),
      margin: '0 0 -2px 0',
      color: theme.textMedium
    };
  case 5:
    return {
      ...style,
      ...setType(theme, {fontSize: theme.fontS, verticalUnits: 5}),
      margin: '0 0 1px 0',
      color: theme.textMedium
    };
  default:
    return style;
  }
}
