import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface ErrorData {
  messages: string[],
}

const getErrorMsg = (error: FetchBaseQueryError | SerializedError) => {
  if ('status' in error) {
    const errMsg = 'error' in error ? error.error : (error.data as ErrorData).messages[0];
    return errMsg;
  } else {
    const errMsg = error.message ?? 'Unknown error';
    return errMsg;
  }
}

export default getErrorMsg;