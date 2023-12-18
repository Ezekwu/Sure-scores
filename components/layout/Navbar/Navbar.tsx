"use client"
import DashboardSvg from '@/public/assets/icons/DashboardSvg';
import ProjectsSvg from '@/public/assets/icons/ProjectsSvg';
import CalenderSvg from '@/public/assets/icons/CalenderSvg';
import FileSvg from '@/public/assets/icons/FileSvg';
import Logo from '../../../public/assets/images/logo-blue.png'



import Link from "next/link";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.scss';

interface NavLinks {
  name: string,
  route: string,
  icon: React.ReactElement
}

const navLinks: NavLinks[] = [
    {
      name: 'Dashboard',
      route: '/dashboard',
      icon: <DashboardSvg />
    },
    {
      name: 'Projects',
      route: '/projects',
      icon:   <ProjectsSvg />
    },
    {
      name: 'Calendar',
      route: '/calendar',
      icon:   <CalenderSvg />
    },
    {
      name: 'Info Portal',
      route: '/infoportal',
      icon:   <FileSvg />
    },
  ]

  export default function Navbar () {
    const currentPath = usePathname();

    return(
      <div className={styles.navWrapper}>
        <div>
          <Image src={Logo} alt='work room logo' className={styles.logo}/>
          <nav>
            {navLinks.map((link) => (
              <Link key={link.name} href={link.route}>
                <div className={`${styles.link_wrapper} ${currentPath === link.route && styles.active}`} key={link.name}> 
                  {link.icon}
                  <p>{link.name}</p>
                </div>
                <span className={`${currentPath === link.route && styles.active_indicator}`}></span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    )
  }