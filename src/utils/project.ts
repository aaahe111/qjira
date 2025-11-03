import { useAsync } from "../utils/use-async";
import { Project } from "../screens/project-list/list";
import { useEffect, useCallback } from "react";
import { cleanObject } from "../utils/index";
import { useHttp } from "../utils/http";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "../utils/use-optimistic-options";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};


export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
 

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: () => {
        // 明确使查询缓存失效，确保重新获取最新数据
        queryClient.invalidateQueries(queryKey);
        // 同时清除单个项目的缓存
        queryClient.removeQueries({
          predicate: (query) => {
            // 安全地检查queryKey的结构和类型
            return query.queryKey[0] === 'project' && 
                   typeof query.queryKey[1] === 'object' && 
                   query.queryKey[1] !== null && 
                   'id' in query.queryKey[1] && 
                   typeof (query.queryKey[1] as any).id === 'number';
          }
        });
      },
      // 乐观更新配置
      async onMutate(target) {
        const previousItems = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (old?: any[]) => {
          return old?.filter((item) => item.id !== target.id) || [];
        });
        return { previousItems };
      },
      onError(error, newItem, context) {
        queryClient.setQueryData(queryKey, context?.previousItems);
      }
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};