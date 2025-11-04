import { Project } from "../types/project";
import { useHttp } from "./http"
import { useAddConfig,useDeleteConfig,useEditConfig } from "./use-optimistic-options";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );

};
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    {
      // 增强缓存更新逻辑
      onSuccess: (_, variables) => {
        // 清除所有projects相关缓存
        queryClient.invalidateQueries("projects");
        // 清除特定项目的缓存
        if (variables.id) {
          queryClient.removeQueries(["project", { id: variables.id }]);
        }
      },
      // 保留乐观更新但添加更安全的类型处理
      async onMutate(target: Partial<Project>) {
        const previousItems = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          return old?.map(item => 
            item.id === target.id ? { ...item, ...target } : item
          ) || [];
        });
        return { previousItems };
      },
      onError(error, newItem, context) {
        queryClient.setQueryData(queryKey, context?.previousItems);
        console.error('编辑项目失败:', error);
      }
    }
  );
};


export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  const queryClient = useQueryClient();
 
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
     }),
    {
      // 增强缓存更新逻辑
      onSuccess: () => {
        // 清除所有projects相关缓存
        queryClient.invalidateQueries("projects");
      },
      // 保留乐观更新但添加更安全的类型处理
      async onMutate(target: Partial<Project>) {
        const previousItems = queryClient.getQueryData(queryKey);
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          return old ? [...old, target as Project] : [target as Project];
        });
        return { previousItems };
      },
      onError(error, newItem, context) {
        queryClient.setQueryData(queryKey, context?.previousItems);
        console.error('添加项目失败:', error);
      }
    }
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
      // 成功时执行多层缓存清理
      onSuccess: (_, variables) => {
        // 方法1: 直接更新特定查询缓存
        if (Array.isArray(queryKey) && queryKey[0] === 'projects') {
          queryClient.setQueryData<Project[]>(queryKey, (oldData) => {
            if (!oldData) return [];
            return oldData.filter(project => project.id !== variables.id);
          });
        }
        
        // 方法2: 清除所有包含projects的查询缓存
        queryClient.invalidateQueries("projects");
        
        // 方法3: 清除单个项目的缓存
        queryClient.removeQueries(["project", { id: variables.id }]);
      },
      // 保留乐观更新逻辑但增强错误处理
      async onMutate(target) {
        const previousItems = queryClient.getQueryData(queryKey);
        // 乐观更新
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          return old?.filter(item => item.id !== target.id) || [];
        });
        return { previousItems };
      },
      onError(error, newItem, context) {
        // 错误回滚
        queryClient.setQueryData(queryKey, context?.previousItems);
        console.error('删除项目失败:', error);
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
}








