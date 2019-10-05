import React from 'react'
import styles from './index.css'

const EdgeToolTips = ({ x, y }) => {
  return (
    <div className={styles.edgeTooltips} style={{ top: `${y}px`, left: `${x}px`}}>
      <div className={styles.edgeTitle}>
        <p className={styles.tooltipsCommon}>凭证开立</p>
        <p className={`${styles.tooltipsCommon} ${styles.tooltipsMoney}`}>1000,000,000元</p>
        <p className={`${styles.tooltipsCommon} ${styles.tooltipsDate}`}>2019-09-10</p>
      </div>
      <div className={styles.edgeDetail}>
        <div className={styles.detailContent}>
          <p className={styles.edgeCode}>交易编码：</p>
          <span className={styles.edgeValue}>1000190203455</span>
        </div>
        <div className={styles.detailContent}>
          <p className={styles.edgeCode}>交易编码：</p>
          <span className={styles.edgeValue}>1000190203455</span>
        </div>
        <div className={styles.detailContent}>
          <p className={styles.edgeCode}>交易编码：</p>
          <span className={styles.edgeValue}>1000190203455</span>
        </div>
      </div>
    </div>
  )
}

export default EdgeToolTips
