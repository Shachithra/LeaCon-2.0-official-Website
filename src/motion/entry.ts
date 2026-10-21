/**
 * Entry-sequence state shared between the overlay and the Home hero (M1/M2).
 *
 * The hero waits for `markEntered()` before it plays its reveal, so the
 * headline and the frame arrive together. When the entry sequence is skipped —
 * reduced motion, paused motion, or a repeat visit — it marks the entry
 * immediately and the hero simply plays.
 */

let entered = false
const listeners = new Set<() => void>()

export const ENTRY_EVENT = 'leacon:entered'

export function markEntered(): void {
  if (entered) return
  entered = true
  listeners.forEach((listener) => listener())
  window.dispatchEvent(new Event(ENTRY_EVENT))
}

export function hasEntered(): boolean {
  return entered
}

export function onEnter(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const SEEN_KEY = 'leacon-entry-seen'

/** First visit in this session, and motion is allowed. Synchronous half. */
export function shouldRunEntry(): boolean {
  try {
    if (sessionStorage.getItem(SEEN_KEY) === '1') return false
  } catch {
    /* storage unavailable: run the sequence anyway */
  }
  return true
}

export function markEntrySeen(): void {
  try {
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    /* ignore */
  }
}
