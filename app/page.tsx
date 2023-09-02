import Image from 'next/image'
import styles from './page.module.scss'
import UiButton from '@/components/ui/Button/UiButton'
import UiInput from '@/components/ui/Input/UiInput'

export default function Home() {
  return (
    <main className={styles.main}>
      Whereas recognition of the inherent dignity
      <br />
      <br />
      <UiButton>
        sign in
      </UiButton>
      <UiInput />
    </main>
  )
}
