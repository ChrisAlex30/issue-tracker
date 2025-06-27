'use client';

import dynamic from 'next/dynamic';
import IssueFormSkeleton from './IssueFormSkeleton';
import { Issue } from '@prisma/client';

const IssueForm = dynamic(() => import('@/app/issues/components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export default function ClientOnlyIssueForm({ issue }: { issue: Issue }) {
  return <IssueForm issue={issue} />;
}