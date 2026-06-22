import type { DragOverEvent, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import type { ExpenseSubcategory } from "../../../../features/expenses/expense-subcategories/interfaces/expense-subcategories.interfaces";

export const SUBCATEGORY_DRAG_PREFIX = "subcategory-" as const;
export const CATEGORY_DROP_PREFIX = "category-" as const;

export function getSubcategoryDragId(uuid: string): string {
  return `${SUBCATEGORY_DRAG_PREFIX}${uuid}`;
}

export function getCategoryDropId(uuid: string): string {
  return `${CATEGORY_DROP_PREFIX}${uuid}`;
}

export function getTargetCategoryUuidFromOver(over: DragOverEvent["over"] | DragEndEvent["over"]): string | null {
  if (!over) return null;

  const overId = String(over.id);
  if (overId.startsWith(CATEGORY_DROP_PREFIX)) {
    return overId.slice(CATEGORY_DROP_PREFIX.length);
  }

  const data = over.data.current;
  if (data?.type === "subcategory" && typeof data.categoryUuid === "string") {
    return data.categoryUuid;
  }
  if (data?.type === "category" && typeof data.categoryUuid === "string") {
    return data.categoryUuid;
  }

  return null;
}

export function getSubcategoryFromActiveId(
  activeId: UniqueIdentifier,
  subcategories: ExpenseSubcategory[],
): ExpenseSubcategory | null {
  const id = String(activeId);
  if (!id.startsWith(SUBCATEGORY_DRAG_PREFIX)) return null;
  const uuid = id.slice(SUBCATEGORY_DRAG_PREFIX.length);
  return subcategories.find((subcategory) => subcategory.uuid === uuid) ?? null;
}
