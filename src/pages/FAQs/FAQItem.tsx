import React, { useState } from 'react'
import styles from './FAQItem.module.scss'
import { ReactComponent as Arrow } from 'icons/view-details.svg'
type Props = {
  data: {
    title: string
    content: string
  }
}
const FAQItem: React.FC<Props> = ({ data }) => {
  const { title, content } = data
  const [opened, setOpened] = useState<boolean>(false)

  const toggle = () => {
    setOpened(!opened)
  }

  return (
    <div className={`${styles.item} ${opened && styles.opened}`}>
      <div className='title-bar' onClick={toggle}>
        {title}
        <span>
          <Arrow />
        </span>
      </div>
      <div className='content'>{content}</div>
    </div>
  )
}

export default FAQItem
