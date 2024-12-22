interface ActionErrorResponse {
  error: true;
  message: string;
}

interface ActionSuccessResponse<DataType> {
  error?: false;
  data: DataType;
}

export type ActionResponse<DataType> =
  | ActionErrorResponse
  | ActionSuccessResponse<DataType>;
