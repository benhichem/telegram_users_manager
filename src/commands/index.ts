import StartCommand from "./start.js";
import GenerateUsersList from "./userList.command.js";
import BulkMessage from "./bulkMessage.command.js";
import BulkRemove from "./bulkRemove.command.js";
import BulkAdd from "./bulkAdd.command.js";
import AddVipUser from "./addvip.command.js";


export const commands = [StartCommand, GenerateUsersList, BulkMessage, BulkRemove, BulkAdd , AddVipUser]


export type commandsenum = "start_command" | 'users_list' | 'bulk_message' | 'bulk_remove' | 'bulk_add' | 'add_vip'