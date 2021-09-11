const breakPoints = {
    sm: 500,
    md: 800,
    lg: 1330,
  }

  export const mediaQueries = (
    min: keyof typeof breakPoints | null,
    max: keyof typeof breakPoints | null
  ) => {
    return (style: TemplateStringsArray | String) => {
      const minWidth = min ? `(min-width: ${breakPoints[min]}px)` : ''
      const maxWidth = max ? `(max-width: ${breakPoints[max]}px)` : ''
      const combiner = min && max ? ' and ' : ''
      return `@media ${minWidth}${combiner}${maxWidth}  { ${style} }`
    }
  }