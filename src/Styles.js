export const horizontalLayout = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}

export const centerLayout = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

export const scrollLayout = {
  alignSelf: 'center',
}

export const reviewLayout = {
  width: 300,
  height: 60,
  alignItems: 'center',
  borderColor: 'black',
  borderWidth: 1,
  margin: 1,
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
