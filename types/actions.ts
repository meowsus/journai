export interface ActionResponse {
  success?: boolean;
  error?: string;
}

export interface ActionResponseWithData<DataType> extends ActionResponse {
  data?: DataType;
}
