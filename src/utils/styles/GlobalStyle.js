import BaseStyle from './BaseStyle'
import { Colors } from './Theme'

/**
 * @class GlobalStyle
 * @extends BaseStyle
 */
class GlobalStyle extends BaseStyle {
  center = {
    justifyContent: 'center',
    alignItems: 'center',
  }

  // Size
  size = (width, height) => ({
    width,
    height: height || width,
  })
  circle(value) {
    return {
      ...this.size(value),
      borderRadius: value / 2,
    }
  }

  // Font Styles
  textColor = (size, color) => ({
    fontSize: size || 14,
    color,
  })
  textColorBold = (size, color) => ({
    fontSize: size || 14,
    fontWeight: 'bold',
    color,
  })

  // Text
  textDefault(size) { return this.textColor(size, Colors.DEFAULT) }
  textDefaultBold(size) { return this.textColorBold(size, Colors.DEFAULT) }
  textPrimary(size) { return this.textColor(size, Colors.PRIMARY) }
  textPrimaryBold(size) { return this.textColorBold(size, Colors.PRIMARY) }
  textWarning(size) { return this.textColor(size, Colors.WARNING) }
  textWarningBold(size) { return this.textColorBold(size, Colors.WARNING) }
  textSuccess(size) { return this.textColor(size, Colors.SUCCESS) }
  textSuccessBold(size) { return this.textColorBold(size, Colors.SUCCESS) }
  textDanger(size) { return this.textColor(size, Colors.DANGER) }
  textDangerBold(size) { return this.textColorBold(size, Colors.DANGER) }
  textMute(size) { return this.textColor(size, Colors.DISABLE) }
  textMuteBold(size) { return this.textColorBold(size, Colors.DISABLE) }
  textWhite(size) { return this.textColor(size, Colors.WHITE) }
  textWhiteBold(size) { return this.textColorBold(size, Colors.WHITE) }

  // BackgroundColor
  bgDefault = { backgroundColor: Colors.DEFAULT }
  bgPrimary = { backgroundColor: Colors.PRIMARY }
  bgSuccess = { backgroundColor: Colors.SUCCESS }
  bgDanger = { backgroundColor: Colors.DANGER }
  bgWarning = { backgroundColor: Colors.WARNING }
  bgMute = { backgroundColor: Colors.DISABLE }

  // Border
  lineTop = value => ({
    borderTopColor: Colors.BORDER_COLOR,
    borderTopWidth: value,
  })
  lineBottom = value => ({
    borderBottomColor: Colors.BORDER_COLOR,
    borderBottomWidth: value,
  })
}

export default GlobalStyle