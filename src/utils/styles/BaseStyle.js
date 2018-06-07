/** 
 * @class BaseStyle 
 */
class BaseStyle {
  constructor() {
    // Flexbox
    this.height = this._setStyle('height')
    this.width = this._setStyle('width')
    this.maxHeight = this._setStyle('maxHeight')
    this.maxWidth = this._setStyle('maxWidth')
    this.minHeight = this._setStyle('minHeight')
    this.minWidth = this._setStyle('minWidth')
    this.margin = this._setStyle('margin')
    this.marginTop = this._setStyle('marginTop')
    this.marginBottom = this._setStyle('marginBottom')
    this.marginLeft = this._setStyle('marginLeft')
    this.marginRight = this._setStyle('marginRight')
    this.marginHorizontal = this._setStyle('marginHorizontal')
    this.marginVertical = this._setStyle('marginVertical')
    this.padding = this._setStyle('padding')
    this.paddingTop = this._setStyle('paddingTop')
    this.paddingBottom = this._setStyle('paddingBottom')
    this.paddingLeft = this._setStyle('paddingLeft')
    this.paddingRight = this._setStyle('paddingRight')
    this.paddingHorizontal = this._setStyle('paddingHorizontal')
    this.paddingVertical = this._setStyle('paddingVertical')
    this.alignItems = this._setStyle('alignItems')
    this.alignSelf = this._setStyle('alignSelf')
    this.justifyContent = this._setStyle('justifyContent')
    this.flex = this._setStyle('flex')
    this.flexDirection = this._setStyle('flexDirection')
    this.flexWrap = this._setStyle('flexWrap')
    this.position = this._setStyle('position')
    this.top = this._setStyle('top')
    this.bottom = this._setStyle('bottom')
    this.left = this._setStyle('left')
    this.right = this._setStyle('right')
    this.zIndex = this._setStyle('zIndex')

    // Shadow Prop Types IOS
    this.shadowColor = this._setStyle('shadowColor')
    this.shadowOffset = this._setStyle('shadowOffset')
    this.shadowOpacity = this._setStyle('shadowOpacity')
    this.shadowRadius = this._setStyle('shadowRadius')
  
    // Transforms
    this.decomposedMatrix = this._setStyle('decomposedMatrix')
    this.transform = this._setStyle('transform')
    this.transformMatrix = this._setStyle('transformMatrix')

    // View
    this.backfaceVisibility = this._setStyle('backfaceVisibility')
    this.backgroundColor = this._setStyle('backgroundColor')
    this.borderRadius = this._setStyle('borderRadius')
    this.borderWidth = this._setStyle('borderWidth')
    this.borderColor = this._setStyle('borderColor')
    this.borderTopRadius = this._setStyle('borderTopRadius')
    this.borderTopWidth = this._setStyle('borderTopWidth')
    this.borderTopColor = this._setStyle('borderTopColor')
    this.borderBottomRadius = this._setStyle('borderBottomRadius')
    this.borderBottomWidth = this._setStyle('borderBottomWidth')
    this.borderBottomColor = this._setStyle('borderBottomColor')
    this.borderLeftRadius = this._setStyle('borderLeftRadius')
    this.borderLeftWidth = this._setStyle('borderLeftWidth')
    this.borderLeftColor = this._setStyle('borderLeftColor')
    this.borderRightRadius = this._setStyle('borderRightRadius')
    this.borderRightWidth = this._setStyle('borderRightWidth')
    this.borderRightColor = this._setStyle('borderRightColor')
    this.borderTopLeftRadius = this._setStyle('borderTopLeftRadius')
    this.borderTopLeftWidth = this._setStyle('borderTopLeftWidth')
    this.borderTopLeftColor = this._setStyle('borderTopLeftColor')
    this.borderTopRightRadius = this._setStyle('borderTopRightRadius')
    this.borderTopRightWidth = this._setStyle('borderTopRightWidth')
    this.borderTopRightColor = this._setStyle('borderTopRightColor')
    this.borderBottomLeftRadius = this._setStyle('borderBottomLeftRadius')
    this.borderBottomLeftWidth = this._setStyle('borderBottomLeftWidth')
    this.borderBottomLeftColor = this._setStyle('borderBottomLeftColor')
    this.borderBottomRightRadius = this._setStyle('borderBottomRightRadius')
    this.borderBottomRightWidth = this._setStyle('borderBottomRightWidth')
    this.borderBottomRightColor = this._setStyle('borderBottomRightColor')
    this.opacity = this._setStyle('opacity')
    this.overflow = this._setStyle('overflow')
    this.resizeMode = this._setStyle('resizeMode')
    this.tintColor = this._setStyle('tintColor')
    this.overlayColor = this._setStyle('overlayColor')
    this.elevation = this._setStyle('elevation')

    // Fonts
    this.textAlign = this._setStyle('textAlign')
    this.color = this._setStyle('color')
    this.fontSize = this._setStyle('fontSize')
    this.fontFamily = this._setStyle('fontFamily')
    this.fontStyle = this._setStyle('fontStyle')
    this.fontWeight = this._setStyle('fontWeight')
    this.lineHeight = this._setStyle('lineHeight')
    this.textDecorationLine = this._setStyle('textDecorationLine')
    this.textShadowColor = this._setStyle('textShadowColor')
    this.textShadowOffset = this._setStyle('textShadowOffset')
    this.textShadowRadius = this._setStyle('textShadowRadius')
    this.textAlignVertical = this._setStyle('textAlignVertical')
    this.letterSpacing = this._setStyle('letterSpacing')
    this.textDecorationColor = this._setStyle('textDecorationColor')
    this.textDecorationStyle = this._setStyle('textDecorationStyle')
    this.writingDirection = this._setStyle('writingDirection')
  }

  _setStyle = (key) => value => (value || value === 0) ? { [key]: value } : {}

  colorOpacity = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16)

    if (alpha) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
    return `rgb(${r}, ${g}, ${b})`
  }
}

export default BaseStyle
