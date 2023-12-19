export function useWrapPromise<T>(
  promise:
    | Promise<T>
    | (Promise<T> &
        ({ status: "fulfilled"; value: T } | { status: "rejected"; reason: string } | { status: "pending" })),
): T {
  if ("status" in promise) {
    switch (promise.status) {
      case "fulfilled":
        return promise.value;
      case "rejected":
        throw promise.reason;
      case "pending":
        throw promise;
    }
  }
  Object.assign(promise, { status: "pending" });
  promise.then(
    (result) => {
      Object.assign(promise, { status: "fulfilled", value: result });
    },
    (reason) => {
      Object.assign(promise, { status: "rejected", reason: reason });
    },
  );
  throw promise;
}
