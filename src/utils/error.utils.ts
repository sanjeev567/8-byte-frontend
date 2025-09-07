export function getErrorFromException(e: unknown) {
  // leave console.log
  if (typeof e === "string") {
    return e;
  } else if (typeof e === "object") {
    const item = e as any;
    let error = "Something Went Wrong";
    if (item.message) {
      error = item.message;
    } else if (item.data) {
      if (item.data.message) {
        error = item.data.message;
      }
    } else if (item.response) {
      error = item.response.data.error;
    }
    return error;
  }
}
