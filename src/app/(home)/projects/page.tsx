import UiButton from "@/src/components/ui/Button/UiButton";
import UiIcon from "@/src/components/ui/Icon/UiIcon";
import styles from './page.module.scss';
import EmptyState from "@/src/components/ui/EmptyState/EmptyState";
import NoProgect from '@/public/assets/images/no-task.png';
import AddProject from "@/src/components/Project/AddProject/AddProject";
export default function page() {

  return (
    <section className={styles.wrapper}>
      <header>
        <h2>Projects</h2>
        <UiButton>
          Add Project
          <UiIcon icon="Plus" size="24" />
        </UiButton>
      </header>

      <main>
        {true && (
          <EmptyState
            cta={
              <UiButton>
                {' '}
                <UiIcon size="24" icon="Plus" /> Add Project
              </UiButton>
            }
            img={NoProgect}
            text="There are no projects yet Let's add them"
          />
        )}
      </main>
      <AddProject/>
    </section>
  );
}