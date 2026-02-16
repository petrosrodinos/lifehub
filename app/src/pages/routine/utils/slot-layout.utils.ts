import type { ScheduleSlot } from "../../../features/routine/interfaces/routine.interface";
import { slotDurationMinutes, timeToMinutes } from "./time.utils";

export const BOARD_START_MINUTES = 5 * 60;
export const BOARD_END_MINUTES = 24 * 60;
export const BOARD_TOTAL_MINUTES = BOARD_END_MINUTES - BOARD_START_MINUTES;
export const TIMELINE_POSITION_HEIGHT_PX = 620;
export const SLOT_DURATION_SCALE = 0.55;
export const MIN_SLOT_HEIGHT_PX = 44;
export const SLOT_GAP_PX = 0;
export const TIMELINE_BOTTOM_PADDING_PX = 64;

export type PositionedSlot = {
  slot: ScheduleSlot;
  topPx: number;
  heightPx: number;
};

export function buildPositionedSlots(slots: ScheduleSlot[]): PositionedSlot[] {
  const sortedSlots = [...slots].sort((a, b) => {
    const startDiff = timeToMinutes(a.start_time) - timeToMinutes(b.start_time);
    if (startDiff !== 0) return startDiff;
    return timeToMinutes(a.end_time) - timeToMinutes(b.end_time);
  });

  let previousBottomPx = 0;
  let previousEndMinutes: number | null = null;

  return sortedSlots.map((slot) => {
    const startMinutes = timeToMinutes(slot.start_time);
    const endMinutes = timeToMinutes(slot.end_time);
    const durationMinutes = slotDurationMinutes(slot.start_time, slot.end_time);
    const relativeStartMinutes = Math.max(0, startMinutes - BOARD_START_MINUTES);
    const rawTopPx = (relativeStartMinutes / BOARD_TOTAL_MINUTES) * TIMELINE_POSITION_HEIGHT_PX;
    const rawHeightPx =
      (durationMinutes / BOARD_TOTAL_MINUTES) *
      TIMELINE_POSITION_HEIGHT_PX *
      SLOT_DURATION_SCALE;
    const isBackToBackSlot = previousEndMinutes !== null && startMinutes <= previousEndMinutes;
    const topPx = isBackToBackSlot
      ? previousBottomPx + SLOT_GAP_PX
      : Math.max(rawTopPx, previousBottomPx + SLOT_GAP_PX);
    const heightPx = Math.max(rawHeightPx, MIN_SLOT_HEIGHT_PX);

    previousBottomPx = topPx + heightPx;
    previousEndMinutes = endMinutes;

    return { slot, topPx, heightPx };
  });
}

export function getTimelineHeightPx(positionedSlots: PositionedSlot[]): number {
  if (positionedSlots.length === 0) {
    return TIMELINE_POSITION_HEIGHT_PX;
  }

  const lastSlot = positionedSlots[positionedSlots.length - 1];
  const maxBottomPx = lastSlot.topPx + lastSlot.heightPx;

  return Math.max(TIMELINE_POSITION_HEIGHT_PX, maxBottomPx + TIMELINE_BOTTOM_PADDING_PX);
}
