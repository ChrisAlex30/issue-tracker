import { Status } from "@prisma/client";

export interface createNewIssueType{
    title:string,
    desc:string
}

export type StatusFilter = Status | "ALL";
