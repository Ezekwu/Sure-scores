'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getCookie } from 'cookies-next';

import ProjectFileList from '@/components/Project/ProjectFileList/ProjectFileList';
import ProjectLinkList from '@/components/Project/ProjectLinkList/ProjectLinkList';
import SetProject from '@/components/Project/SetProject/SetProject';

import UiAvatar from '@/components/ui/Avatar/UiAvatar';
import UiButton from '@/components/ui/Button/UiButton';
import UiIcon from '@/components/ui/Icon/UiIcon';
import UiLoader from '@/components/ui/Loader/UiLoader';
import UiPriority from '@/components/ui/Priority/UiPriority';

import { useGetProjectQuery } from '@/redux/features/Projects';
import { useGetUserQuery } from '@/redux/features/Account';

import { formatDate } from '@/utils/helperFunctions';
import useToggle from '@/utils/hooks/useToggle';

import styles from './layout.module.scss';

//--

export default function ProjectDetailsLayout({ children }: { children: React.ReactNode }) {
  const companyId = getCookie('active_companyId');
  
  const { projectId } = useParams();
  
  const { data: project, isLoading: isProjectLoading } = useGetProjectQuery({companyId, projectId: projectId as string});
  
  const {data: reporter, isLoading: isReporterLoading} = useGetUserQuery(project?.reporter_id!, {skip: !project?.reporter_id})
    
  const isDescriptionExpanded = useToggle();
  
  const description = isDescriptionExpanded.value
    ? project?.description
    : project && project?.description.length > 100 ? project?.description.slice(0, 100) + '...' : project?.description

  
  const isLoading = isProjectLoading || isReporterLoading
  
  const isFileListVisible = useToggle();
  const isLinkListVisible = useToggle();
  const isEditProjectVisible = useToggle();

  if (isLoading) {
    return <UiLoader/>
  }
  
  return (
    <section className={styles.wrapper}>
      <header>
        <Link href="/projects">
          <UiIcon icon="ArrowLeft" size="24" />
          <p>Back to Projects</p>
        </Link>
        <div className={styles.title_addTask}>
          <h2>{project?.name}</h2>
          <UiButton>
            <UiIcon icon="Plus" size="24" />
            Add Task
          </UiButton>
        </div>
      </header>
      <div className={styles.project_details_tasks}>
        <aside>
          <div>
            <div className={styles.project_number}>
              <div>
                <h3>Project Number</h3>
                <p className={styles.number}>{project?.project_number}</p>
              </div>
              <div className={styles.edit_button}>
                {' '}
                <UiButton
                  onClick={() => isEditProjectVisible.on()}
                  variant="secondary"
                  size="icon"
                >
                  <UiIcon size="24" icon="Edit" />
                </UiButton>
              </div>
            </div>
            <div className={styles.description}>
              <h3>Description</h3>
              <p>
                {description}{' '}
                {description && description?.length > 100 && (
                  <button onClick={() => isDescriptionExpanded.toggle()}>
                    {isDescriptionExpanded.value ? 'See less' : 'See more'}
                  </button>
                )}
              </p>
            </div>
            <section className={styles.group_flex}>
              <div className={styles.reporter}>
                <h4>Reporter</h4>
                <div>
                  <UiAvatar imgSrc={reporter?.img} />
                  <h4>{reporter?.name}</h4>
                </div>
              </div>
              <div className={styles.priority}>
                <h4>Priority</h4>
                <UiPriority priority={project?.priority!} />
              </div>
              <div className={styles.deadline}>
                <h4>Dead Line</h4>
                <p>{formatDate(project?.dead_line || '', 'MMM DD, YYYY')}</p>
              </div>
              <div className={styles.created_at}>
                <UiIcon icon="Calendar" size="24" />
                <p>
                  Created{' '}
                  {formatDate(
                    project?.created_at.toString() || '',
                    'MMM DD, YYYY',
                  )}
                </p>
              </div>
            </section>
            <section>
              <div className={styles.buttons_flex}>
                {project?.links && project.links.length > 0 && (
                  <UiButton
                    onClick={() => isLinkListVisible.on()}
                    size="icon"
                    variant="light-blue"
                  >
                    <UiIcon icon="Link" size="24" />
                  </UiButton>
                )}
                {project?.files && project.files.length > 0 && (
                  <UiButton
                    onClick={() => isFileListVisible.on()}
                    size="icon"
                    variant="egg-plant"
                  >
                    <UiIcon icon="Attach" size="24" />
                  </UiButton>
                )}
              </div>
            </section>
          </div>
        </aside>
        <main>{children}</main>
      </div>
      {project?.files && (
        <ProjectFileList
          files={project?.files}
          isOpen={isFileListVisible.value}
          onClose={() => isFileListVisible.off()}
        />
      )}
      {project?.links && (
        <ProjectLinkList
          links={project.links}
          isOpen={isLinkListVisible.value}
          onClose={() => isLinkListVisible.off()}
        />
      )}
      {project && (
        <SetProject
          isOpen={isEditProjectVisible.value}
          onClose={() => isEditProjectVisible.off()}
          defaultProject={project}
        />
      )}
    </section>
  );
}
