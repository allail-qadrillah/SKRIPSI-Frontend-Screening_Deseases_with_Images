export interface FileWithPreview extends File {
  preview: string;
}

export interface ApiModelResult extends File {
  status: number;
  negative: number;
  positive: number;
  image_clahe_base64: string;
  image_attention_map_base64: string;
}
