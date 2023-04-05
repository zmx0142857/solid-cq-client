import { ws } from '../ws/instance'

interface GroupFile {
  group_id: number
  file_id: string
  file_name: string
  busid: number
  file_size: number
  upload_time: number
  dead_time: number
  modify_time: number
  download_times: number
  uploader: number
  uploader_name: string
}

interface GroupFileFolder {
  group_id: number
  folder_id: number
  folder_name: string
  create_time: number
  creator: number
  creator_name: string
  total_file_count: number
}

interface GroupFsList {
  files: GroupFile[]
  folders: GroupFileFolder[]
}

function getGroupRootFile(group_id: number) {
  ws()?.get('get_group_root_files', { group_id })
}

function isGroupRootFsListMessage(obj: any): obj is GroupFsList {
  return obj && Object.hasOwn(obj, 'files') && Object.hasOwn(obj, 'folders')
}

function getFileUrl(group_id: number, file_id: string, busid: number) {
  ws()?.get('get_group_file_url', { group_id, file_id, busid })
}

function isSingleFileUrl(data: any): data is { url: string } {
  return data && Object.hasOwn(data, 'url') && Object.keys(data).length === 1
}

export type{
  GroupFile,
  GroupFileFolder,
  GroupFsList,
}

export {
  getGroupRootFile,
  isGroupRootFsListMessage,
  isSingleFileUrl,
  getFileUrl,
}
