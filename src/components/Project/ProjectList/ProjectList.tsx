import { useState } from "react";
import Project from "@/src/types/Project";
import styles from './projectList.module.scss';
import Link from "next/link";
import UiIcon from "../../ui/Icon/UiIcon";
import EmptyState from "../../ui/EmptyState/EmptyState";
import UiButton from "../../ui/Button/UiButton";
import NoProject from '@/public/assets/images/no-task.png'

interface Props {
  projects: Project[]
}

export default function ProjectList({projects}: Props) {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const isTaskEmpty = activeProject.tasks?.length < 1;

  console.log(activeProject.tasks);
  

  function isActiveProject(id: string) {
    return activeProject?.id === id
  }

  function onSetActiveProject(project: Project) {
    setActiveProject(project)
  }

  return (
    <section className={styles.wrapper}>
      <aside>
        <header>Current Projects</header>
        <div className={styles.project_list}>
          {projects.map((project) => (
            <div
              onClick={() => onSetActiveProject(project)}
              className={styles.project}
            >
              <div
                className={`${isActiveProject(project.id) && styles.active_project}`}
              >
                <p className={styles.project_number}>
                  {project.project_number}
                </p>
                <h4 className={styles.project_name}>{project.name}</h4>
                <Link
                  className={`${isActiveProject(project.id) && styles.active_project_link}`}
                  href={`/projects/${project.id}/tasks`}
                >
                  View details <UiIcon size="24" icon="CaretRight" />
                </Link>
              </div>
              <span
                className={`${isActiveProject(project.id) && styles.active_indicator}`}
              ></span>
            </div>
          ))}
        </div>
      </aside>
      <main>
        {isTaskEmpty ? (
          <div><EmptyState
            text="There are no tasks in this project yet Let's add them"
            img={NoProject}
            cta={
              <UiButton>
                {' '}
                <UiIcon size="24" icon="Plus" /> Add Task
              </UiButton>
            }
          /></div>
          
        ) : (
          <div></div>
        )}
      </main>
    </section>
  );
}