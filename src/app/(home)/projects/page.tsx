"use client"

import UiButton from "@/src/components/ui/Button/UiButton";
import UiIcon from "@/src/components/ui/Icon/UiIcon";
import styles from './page.module.scss';
import EmptyState from "@/src/components/ui/EmptyState/EmptyState";
import NoProgect from '@/public/assets/images/no-task.png';
import AddProject from "@/src/components/Project/AddProject/AddProject";
import useToggle from "@/src/utils/hooks/useToggle";
import { useGetProjectsQuery } from "@/src/redux/features/Projects";
import UiLoader from "@/src/components/ui/Loader/UiLoader";
import ProjectList from "@/src/components/Project/ProjectList/ProjectList";

export default function Page() {
  const {data: projects, isLoading} = useGetProjectsQuery();
  const isAddProjectOpen = useToggle();

  if(isLoading){
    return <UiLoader/>
  }

  return (
    <section className={styles.wrapper}>
      <header>
        <h2>Projects</h2>
        <UiButton onClick={() => isAddProjectOpen.on()}>
          Add Project
          <UiIcon icon="Plus" size="24" />
        </UiButton>
      </header>

      <main>
        {projects?.length! < 1 && (
          <EmptyState
            cta={
              <UiButton onClick={() => isAddProjectOpen.on()}>
                {' '}
                <UiIcon size="24" icon="Plus" /> Add Project
              </UiButton>
            }
            img={NoProgect}
            text="There are no projects yet Let's add them"
          />
        )}
        {projects?.length! > 0 && <ProjectList projects={projects!} />}
      </main>
      <AddProject
        isOpen={isAddProjectOpen.value}
        onClose={() => isAddProjectOpen.off()}
      />
    </section>
  );
}