import { z } from 'zod';
export const prSchema = z.object({
    number: z.string(),
    url: z.string(),
});
export const commitSchema = z.object({
    upstream: z.string(),
    downstream: z.string(),
    branch: z.string(),
    tag: z.string(),
    pr: prSchema.optional(),
});
export const downstreamSchema = z.object({
    name: z.string(),
    alias: z.string().optional(),
    commits: z.array(commitSchema),
});
export const dataSchema = z.object({
    pr: z.string(),
    downstream: z.array(downstreamSchema),
});
//# sourceMappingURL=output.js.map