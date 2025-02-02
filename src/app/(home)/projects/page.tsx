"use client"

import { getCookie } from "cookies-next";

import UiButton from "@/components/ui/Button/UiButton";
import UiIcon from "@/components/ui/Icon/UiIcon";
import styles from './page.module.scss';
import EmptyState from "@/components/ui/EmptyState/EmptyState";
import NoProgect from '@/public/assets/images/no-task.png';
import SetProject from "@/components/Project/SetProject/SetProject";
import useToggle from "@/utils/hooks/useToggle";
import { useGetProjectsQuery } from "@/redux/features/Projects";
import UiLoader from "@/components/ui/Loader/UiLoader";
import ProjectList from "@/components/Project/ProjectList/ProjectList";

export default function Page() {
  const companyId = getCookie('active_companyId');
  const { data: projects, isLoading } = useGetProjectsQuery(companyId);
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
      <SetProject
        isOpen={isAddProjectOpen.value}
        onClose={() => isAddProjectOpen.off()}
      />
    </section>
  );
}
