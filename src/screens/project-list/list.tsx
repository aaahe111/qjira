import React from "react";
import { User } from "./search-panel";
import { Table } from "antd";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  return (
    <Table pagination={false}  dataSource={list} columns={[{
      title: '名称', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '部门', dataIndex: 'organization', sorter: (a, b) => a.organization.localeCompare(b.organization),
    },
    {
      title: '负责人', 
      render(value, project) {
        return <span>
          {users.find((user: User) => user.id === project.personId)?.name || '未知'}
        </span>
      }
    },
    {
     title: '创建时间',
     render(value, project) {
       return(
       <span>
          {
            new Date(project.created).toISOString().split('T')[0]
          }
        </span>
        )
     }
    }
    ]}/>
  );
};