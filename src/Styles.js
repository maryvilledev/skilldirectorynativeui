export const horizontalLayout = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignSelf: 'center',
  alignItems: 'center',
}

export const centerLayout = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
}

export const scrollLayout = {
  alignSelf: 'stretch',
  height: 500,
}

export const skillSelector = Object.assign({
  borderColor: 'black',
  borderWidth: 3,
}, centerLayout)

export const reviewLayout = {
  width: 300,
  height: 60,
  alignItems: 'center',
  alignSelf: 'center',
  borderColor: 'black',
  borderRadius: 3,
  borderWidth: 1,
  margin: 1,
}

export const formElement = {
  borderRadius: 3,
  borderWidth: 0.5,
  margin: 10,
  marginVertical: 5,
  overflow: 'hidden',
}

export const positiveReview = Object.assign({backgroundColor: '#00e600'}, reviewLayout)
export const negativeReview = Object.assign({backgroundColor: '#ff6666'}, reviewLayout)
export const linkLayout = Object.assign({backgroundColor: '#f2f2f2'}, reviewLayout)

export const textStyles = {
  small: {
    fontSize: 10,
  },
  large: {
    fontSize: 30,
  }
}
