import styles from './layout.module.scss';
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <section className={styles.dashboardlayout}>
      <nav>
        <Link href='/dashboard'>
          <p>Dashboard</p>
        </Link>
        <Link href='/projects'>
          <p>Projects</p>
        </Link>
        <Link href='/calender'>
          <p>Calender</p>
        </Link>
        <Link href='/infoportal'>
          <p>Info Portal</p>
        </Link>
      </nav>
      {children}
    </section>
  )
}