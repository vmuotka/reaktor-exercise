import { FC } from 'react'

interface Props {
  className?: string
}

const ArrowLeft: FC<Props> = (props: Props) => {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>
  )
}

export default ArrowLeft