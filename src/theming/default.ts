import { generate } from '@ant-design/colors'
import { TinyColor } from '@ctrl/tinycolor'
import { ThemeConfig } from 'antd/es/config-provider/context'
import { GlobalToken } from 'antd/es/theme/interface'

const getThemeConfig = (
  currentToken: GlobalToken,
  currentTheme: 'dark' | 'default'
): ThemeConfig => {
  const palette = generate(currentToken.colorPrimary, {theme: currentTheme})
  // analog[][] analogous colors
  const analog = palette.map((color) => new TinyColor(color).analogous().map((c) => c.toHexString()))
  // complement[] complement colors
  const complement = palette.map((color) => new TinyColor(color).complement().toHexString())
  return {
    token: {
      //   colorPrimary: '',
    },
    components: {
      Table: {
        colorFillAlter: palette[2],
        // colorFillAlter: analog[2][4],
        // colorFillAlter: complement[2],
      },
      Card: {
        colorFillAlter: palette[2],
      },
      // Button: {
      //   colorFillContent:"#69c0ff",
      //   colorFillAlter: "#69c0ff",
      // },
    },
  }
}

export default getThemeConfig
