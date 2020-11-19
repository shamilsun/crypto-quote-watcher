// @flow
// original idea https://github.com/nirsky/react-native-size-matters
import {Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window')
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width]

// guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350
const guidelineBaseHeight = 680

const normalize = (size:any) => Number(Number.parseFloat(size).toFixed(1))

const scale = (size:number) => normalize((shortDimension / guidelineBaseWidth) * size)
const verticalScale = (size:number) =>
  normalize((longDimension / guidelineBaseHeight) * size)
const moderateScale = (size:number, factor = 0.5) =>
  normalize(size + (scale(size) - size) * factor)

export {scale, verticalScale, moderateScale, normalize}
