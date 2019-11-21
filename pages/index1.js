import styles from './index1.css';
import Link from 'umi/link';
export default function() {
  return (
    <div className={styles.normal}>
      <h1>Page index1</h1>
      <div><Link to="./index">go to /index</Link></div>
    </div>
  );
}
