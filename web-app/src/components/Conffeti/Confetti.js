// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default () => {
  // const { width, height } = useWindowSize()
  const [width, height] = [300, 600]

  return (
    <Confetti
      width={width}
      height={height}
    />
  )
}