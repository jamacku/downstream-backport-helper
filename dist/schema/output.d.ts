import { z } from 'zod';
export declare const prSchema: z.ZodObject<{
    number: z.ZodString;
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    number: string;
    url: string;
}, {
    number: string;
    url: string;
}>;
export declare const commitSchema: z.ZodObject<{
    upstream: z.ZodString;
    downstream: z.ZodString;
    branch: z.ZodString;
    tag: z.ZodString;
    pr: z.ZodOptional<z.ZodObject<{
        number: z.ZodString;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        number: string;
        url: string;
    }, {
        number: string;
        url: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    branch: string;
    tag: string;
    downstream: string;
    upstream: string;
    pr?: {
        number: string;
        url: string;
    } | undefined;
}, {
    branch: string;
    tag: string;
    downstream: string;
    upstream: string;
    pr?: {
        number: string;
        url: string;
    } | undefined;
}>;
export type Commit = z.infer<typeof commitSchema>;
export declare const downstreamSchema: z.ZodObject<{
    name: z.ZodString;
    alias: z.ZodOptional<z.ZodString>;
    commits: z.ZodArray<z.ZodObject<{
        upstream: z.ZodString;
        downstream: z.ZodString;
        branch: z.ZodString;
        tag: z.ZodString;
        pr: z.ZodOptional<z.ZodObject<{
            number: z.ZodString;
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            number: string;
            url: string;
        }, {
            number: string;
            url: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        branch: string;
        tag: string;
        downstream: string;
        upstream: string;
        pr?: {
            number: string;
            url: string;
        } | undefined;
    }, {
        branch: string;
        tag: string;
        downstream: string;
        upstream: string;
        pr?: {
            number: string;
            url: string;
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    commits: {
        branch: string;
        tag: string;
        downstream: string;
        upstream: string;
        pr?: {
            number: string;
            url: string;
        } | undefined;
    }[];
    alias?: string | undefined;
}, {
    name: string;
    commits: {
        branch: string;
        tag: string;
        downstream: string;
        upstream: string;
        pr?: {
            number: string;
            url: string;
        } | undefined;
    }[];
    alias?: string | undefined;
}>;
export type Downstream = z.infer<typeof downstreamSchema>;
export declare const dataSchema: z.ZodObject<{
    pr: z.ZodString;
    downstream: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        alias: z.ZodOptional<z.ZodString>;
        commits: z.ZodArray<z.ZodObject<{
            upstream: z.ZodString;
            downstream: z.ZodString;
            branch: z.ZodString;
            tag: z.ZodString;
            pr: z.ZodOptional<z.ZodObject<{
                number: z.ZodString;
                url: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                number: string;
                url: string;
            }, {
                number: string;
                url: string;
            }>>;
        }, "strip", z.ZodTypeAny, {
            branch: string;
            tag: string;
            downstream: string;
            upstream: string;
            pr?: {
                number: string;
                url: string;
            } | undefined;
        }, {
            branch: string;
            tag: string;
            downstream: string;
            upstream: string;
            pr?: {
                number: string;
                url: string;
            } | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        commits: {
            branch: string;
            tag: string;
            downstream: string;
            upstream: string;
            pr?: {
                number: string;
                url: string;
            } | undefined;
        }[];
        alias?: string | undefined;
    }, {
        name: string;
        commits: {
            branch: string;
            tag: string;
            downstream: string;
            upstream: string;
            pr?: {
                number: string;
                url: string;
            } | undefined;
        }[];
        alias?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    downstream: {
        name: string;
        commits: {
            branch: string;
            tag: string;
            downstream: string;
            upstream: string;
            pr?: {
                number: string;
                url: string;
            } | undefined;
        }[];
        alias?: string | undefined;
    }[];
    pr: string;
}, {
    downstream: {
        name: string;
        commits: {
            branch: string;
            tag: string;
            downstream: string;
            upstream: string;
            pr?: {
                number: string;
                url: string;
            } | undefined;
        }[];
        alias?: string | undefined;
    }[];
    pr: string;
}>;
export type Data = z.infer<typeof dataSchema>;
