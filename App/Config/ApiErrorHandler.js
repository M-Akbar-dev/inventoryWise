export const normalizeApiError = (error) => {
    const response = error?.response?.data;
    return {
      message:
        response?.message ||
        error?.message ||
        "Something went wrong. Please try again.",
      status: error?.response?.status || 500,
      raw: error,
    };
  };
  