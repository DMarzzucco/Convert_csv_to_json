import {Task} from "@prisma/client"

export type createUser = Omit<Task, "id"| "create_time" | "update_time">
