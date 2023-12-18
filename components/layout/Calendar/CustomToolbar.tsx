import ArrowLeftSvg from '../../../public/assets/icons/ArrowLeftSvg'
import ArrowRightSvg from '../../../public/assets/icons/ArrowRightSvg'
import styles from './CustomToolbar.module.scss'


const currentDate = new Date();
const options = { month: 'long', year: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('en-US', options);



export default function CustomToolbar  ({onNavigate, label}:any) {

  return(
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div onClick={() => onNavigate('PREV')} ><ArrowLeftSvg/></div>
        <p onClick={() => onNavigate('TODAY')}>{label}</p>
        <div onClick={() => onNavigate('NEXT')}><ArrowRightSvg /></div>
      </div>
    </div>
  )
}