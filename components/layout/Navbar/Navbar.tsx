"use client"
import DashboardSvg from '@/public/assets/icons/DashboardSvg';
import ProjectsSvg from '@/public/assets/icons/ProjectsSvg';
import CalenderSvg from '@/public/assets/icons/CalenderSvg';
import FileSvg from '@/public/assets/icons/FileSvg';
import ExitSvg from '@/public/assets/icons/ExitSvg';
import Logo from '../../../public/assets/images/logo-blue.png';
import supportIllustration from '../../../public/assets/images/support-illustration.png';
import UiButton from '@/components/ui/Button/UiButton';
import { removeAuthToken } from '@/utils/cookieMthods';
import { useRouter } from 'next/navigation';

import Link from "next/link";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.scss';
import MessageSvg from '@/public/assets/icons/MessageSvg';

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
    const router = useRouter();
    const currentPath = usePathname();
    const isActive = (href: string) => {
      return currentPath === href || currentPath.startsWith(href);
    }

    function logoutUser() {
      removeAuthToken();
      router.push('/auth/login')
    }

    return (
      <aside className={styles.navWrapper}>
        <section className={styles.logo_wrapper}>
          <Image src={Logo} alt="work room logo" className={styles.logo} />
        </section>
        <section className={styles.overflow_container}>
          <nav>
            {navLinks.map((link) => (
              <Link key={link.name} href={link.route}>
                <div
                  className={`${styles.link_wrapper} ${isActive(link.route) && styles.active}`}
                  key={link.name}
                >
                  {link.icon}
                  <p>{link.name}</p>
                </div>
                <span
                  className={`${isActive(link.route) && styles.active_indicator}`}
                ></span>
              </Link>
            ))}
          </nav>
          <div className={styles.bottom_column}>
            <div className={styles.support}>
              <Image src={supportIllustration} alt="" />
              <UiButton>
                <MessageSvg />
                Support
              </UiButton>
            </div>
            <span onClick={logoutUser}>
              <ExitSvg />
              Logout
            </span>
          </div>
        </section>
      </aside>
    );
  }