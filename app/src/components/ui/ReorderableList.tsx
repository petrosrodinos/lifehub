import { useMemo } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DraggableAttributes,
  type DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type SortableItemRenderProps = {
  setNodeRef: (element: HTMLElement | null) => void;
  attributes: DraggableAttributes;
  listeners: DraggableSyntheticListeners;
  transform: { x: number; y: number; scaleX: number; scaleY: number } | null;
  transition: string | undefined;
  isDragging: boolean;
  style: React.CSSProperties;
};

type SortableItemProps<T> = {
  id: string;
  item: T;
  index: number;
  children: (item: T, index: number, props: SortableItemRenderProps) => React.ReactNode;
};

function SortableItem<T>({ id, item, index, children }: SortableItemProps<T>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      {children(item, index, {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
        style,
      })}
    </>
  );
}

export type ReorderableListProps<T> = {
  items: T[];
  getItemId: (item: T) => string;
  onReorder: (reorderedItems: T[]) => void;
  orderKey?: keyof T;
  gapClass?: string;
  children: (item: T, index: number, props: SortableItemRenderProps) => React.ReactNode;
};

export function ReorderableList<T>({
  items,
  getItemId,
  onReorder,
  orderKey,
  gapClass = "space-y-6",
  children,
}: ReorderableListProps<T>) {
  const sortedItems = useMemo(() => {
    if (!orderKey) return items;
    return [...items].sort((a, b) => {
      const aVal = a[orderKey] as number | undefined;
      const bVal = b[orderKey] as number | undefined;
      return (aVal ?? 0) - (bVal ?? 0);
    });
  }, [items, orderKey]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sortedItems.findIndex((item) => getItemId(item) === active.id);
    const newIndex = sortedItems.findIndex((item) => getItemId(item) === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const reordered = arrayMove(sortedItems, oldIndex, newIndex);
    onReorder(reordered);
  };

  const itemIds = useMemo(() => sortedItems.map(getItemId), [sortedItems, getItemId]);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <div className={gapClass}>
          {sortedItems.map((item, index) => (
            <SortableItem key={getItemId(item)} id={getItemId(item)} item={item} index={index}>
              {children}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
