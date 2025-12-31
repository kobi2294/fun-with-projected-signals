# Projected Signal - Signal Store to Signal Forms Bridge

A utility that bridges **Signal Store** state with **Signal Forms** while maintaining **unidirectional data flow** and **state machine semantics**.

## The Problem

Directly binding forms to store signals bypasses store methods, breaking devtools logging, custom logic execution, and atomic updates.

## The Solution

`projectedSignal` routes all form updates through store methods instead of direct mutations:

```typescript
export interface ProjectedSignal<T> extends WritableSignal<T> {}
```

## Example

Create a projected signal that bridges store to form:

```typescript
readonly projected = projectedSignal({
  computation: () => // ...value computed from store,
  update: newVal => // ...call store methods to update state
});

// since ProjectedSignal extends WritableSignal, it can be used directly in forms
readonly form = form(this.projected, path => {
  max(path.x, 20), max(path.y, 20)
});
```

All form updates now go through `store.setXY()` instead of mutating signal state directly.

## Data Flow

Form Update → `projectedSignal.set()` → `store.setXY()` → Store State Changes → Devtools Logs → UI Updates

## Key Benefits

1. **Unidirectional Data Flow** - Updates always go through store methods
2. **State Machine Semantics** - Atomic multi-value updates, custom logic, predictable transitions
3. **Devtools Integration** - All changes logged and debuggable
4. **Minimal Boilerplate** - Single utility eliminates bridge code

# My courses in Udemy
### [Modern Angular with Signals - The missing guide](https://www.udemy.com/course/modern-angular-with-signals-the-missing-guide/?couponCode=MISSING_GUIDE_12)

[![Modern Angular with Signals - The missing guide](./images/modren-angular-with-signals.png)](https://www.udemy.com/course/modern-angular-with-signals-the-missing-guide/?couponCode=MISSING_GUIDE_12)

### [NgRx Signal Store for Angular - The missing guide](https://www.udemy.com/course/ngrx-signal-store-the-missing-guide/?couponCode=MISSING_GUIDE_12)

[![NgRx Signal Store for Angular - The missing guide](./images/ngrx-signal-store.png)](https://www.udemy.com/course/ngrx-signal-store-the-missing-guide/?couponCode=MISSING_GUIDE_12)

### [Theming Angular with Material - The missing guide](https://www.udemy.com/course/theming-angular-and-material-md3-the-missing-guide/?couponCode=MISSING_GUIDE_12)

[![Theming Angular with Material - The missing guide](./images/theming-angular-and-material.png)](https://www.udemy.com/course/theming-angular-and-material-md3-the-missing-guide/?couponCode=MISSING_GUIDE_12)