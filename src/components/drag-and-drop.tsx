import React, { ReactNode } from "react";
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from "react-beautiful-dnd";

type DropProps = Omit<DroppableProps, "children"> & { children: ReactNode };

export const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          // 先创建不包含ref的props对象
          const propsToPass = {
            ...provided.droppableProps,
            provided,
          };
          // 使用正确的方式传递ref
          return React.cloneElement(children, propsToPass, provided.innerRef);
        }
        return <div />;
      }}
    </Droppable>
  );
};

type DropChildProps = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps
> &
  React.HTMLAttributes<HTMLDivElement>;
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
      {props.provided?.placeholder}
    </div>
  )
);

type DragProps = Omit<DraggableProps, "children"> & { children: ReactNode };
export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          // 先创建不包含ref的props对象
          const propsToPass = {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
          };
          // 使用正确的方式传递ref
          return React.cloneElement(children, propsToPass, provided.innerRef);
        }
        return <div />;
      }}
    </Draggable>
  );
};