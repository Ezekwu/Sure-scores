import styles from './layout.module.scss';
import Navbar from '@/components/layout/Navbar/Navbar';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <section className={styles.dashboardlayout}>
      <Navbar />
      {children}
    </section>
  )
}