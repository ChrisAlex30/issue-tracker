import { z } from 'zod';

export const IssueSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    desc: z.string().min(1, 'Description is required').max(65535)
});

export const PatchIssueSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255).optional(),
    desc: z.string().min(1, 'Description is required').max(65535).optional(),
    assignedToUserId:z.string().min(1, 'Assign is required').max(255).optional().nullable(),
});
