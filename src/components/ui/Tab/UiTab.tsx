import Link from "next/link";
import styles from './tab.module.scss'

type Tab = {
  label: React.ReactNode;
  url: string
}

interface Props {
  tabs: Tab[];
  activeTab: string;
}

export default function UiTab({activeTab, tabs}: Props) {
    
  return (
    <div className={styles.tab}>
      {tabs.map((tab, index) => (
        <Link
          className={`${activeTab === tab.url ? styles.active_tab : ''}`}
          key={index}
          href={tab.url}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
