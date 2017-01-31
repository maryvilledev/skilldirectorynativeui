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

export const positiveReview = Object.assign({backgroundColor: 'green'}, reviewLayout)
export const negativeReview = Object.assign({backgroundColor: 'red'}, reviewLayout)

export const textStyles = {
  small: {
    fontSize: 10,
  },
  large: {
    fontSize: 30,
  }
}
