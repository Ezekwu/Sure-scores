'use client';

import { useParams } from 'next/navigation';
import { useGetProjectQuery } from '@/src/redux/features/Projects';
import styles from './layout.module.scss';
import UiButton from '@/src/components/ui/Button/UiButton';
import UiIcon from '@/src/components/ui/Icon/UiIcon';
import Link from 'next/link';
import UiLoader from '@/src/components/ui/Loader/UiLoader';
import UiPriority from '@/src/components/ui/Priority/UiPriority';
import UiLinkTag from '@/src/components/ui/LinkTag/UiLinkTag';
import UiFilePreview from '@/src/components/ui/FilePreview/UiFilePreview';
import { formatDate, getPriorityArrow } from '@/src/utils/helperFunctions';

export default function ProjectDetailsLayout({ children }: { children: React.ReactNode }) {
  const { projectId } = useParams();
  const { data: project, isLoading } = useGetProjectQuery(projectId as string);
  const attacmentLength = (project?.files?.length || 0)  + (project?.links?.length || 0);

  console.log(project);
  

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
          <div className={styles.edit_button}>
            {' '}
            <UiButton variant="secondary" size="icon">
              <UiIcon size="24" icon="Edit" />
            </UiButton>
          </div>
          <div className={styles.project_number}>
            <h3>Project Number</h3>
            <p className={styles.number}>{project?.project_number}</p>
          </div>
          <div className={styles.description}>
            <h3>Description</h3>
            <p>{project?.description}/</p>
          </div>
          <section className={styles.group_flex}>
            <div className={styles.reporter}>
              <h4>Reporter</h4>
              <div></div>
            </div>
            <div className={styles.assignees}>
              <h4>Assignees</h4>
              <div></div>
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
              <UiButton size="icon" variant="light-blue">
                <UiIcon icon="Link" size="24" />
              </UiButton>
              <UiButton size="icon" variant="egg-plant">
                <UiIcon icon="Attach" size="24" />
              </UiButton>
            </div>
            <div>
              <h3>Attachments({attacmentLength})</h3>
              <div className={styles.files}>
                {project?.files?.map((file) => (
                  <UiFilePreview fileData={file} />
                ))}
              </div>
              <div className={styles.links}>
                {project?.links.map((link, index) => (
                  <UiLinkTag link={link} key={index} />
                ))}
              </div>
            </div>
          </section>
        </aside>
        <main>{children}</main>
      </div>
    </section>
  );
}
