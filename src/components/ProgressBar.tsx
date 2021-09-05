import React from 'react'

type Props = {
  total: number
  current: number
}

const ProgressBar: React.FC<Props> = ({ total, current }) => {
  const progress = Math.ceil((current * 100) / total)

  return (
    <div className='progress-bar'>
      <div className='block-progress'>
        <div className='line'>
          <div className='line-inner' style={{ width: `${progress}%` }}></div>
        </div>
        <div className='info'>
          Application Progress: <strong>{progress}%</strong>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
