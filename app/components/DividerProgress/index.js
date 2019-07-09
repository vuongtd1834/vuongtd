import React from 'react'

const DividerProgress = props => {
  const styles = {
    divider: {
      backgroundColor: props.backgroundColor || '#bdbdbd',
      width: props.width || '100%',
      height: props.height || 3
    },
    progress: {
      backgroundColor: props.progressColor || '#046dc8',
      width: props.progressWidth || '30%',
      height: props.height || 3,
      float: props.side || 'left'
    }
  }

  return (
    <div style={styles.divider}>
      <span style={styles.progress} />
    </div>
  )
}

export default DividerProgress
