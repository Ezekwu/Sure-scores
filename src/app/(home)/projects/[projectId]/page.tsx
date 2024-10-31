'use client';

import { useParams } from 'next/navigation';
import { useGetProjectQuery } from '@/src/redux/features/Projects';

export default function Page() {
  const { projectId } = useParams();
  const {data: project, isLoading} = useGetProjectQuery(projectId as string);

  return (
    <section>
      <header>
        <h2>{}</h2>
      </header>
    </section>
  )
}
