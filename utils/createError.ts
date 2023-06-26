export const createError = (status: number, message: string) => {
  const err = new Error() as any;
  err.status = status;
  err.message = message;
  return err;
};
