import { http, ApiListResponse } from './http'

export type Partition = {
  id: number
  title: string
  category?: string
  description?: string
  noise_reduction?: string
  thickness?: string
  material?: string
  price_per_sqm?: string
  image_url?: string
  public_image_url?: string
  is_active: boolean
}

export async function listPartitions(params: { title?: string; active?: boolean } = {}): Promise<ApiListResponse<Partition[]>> {
  const res = await http.get('/api/partitions', { params })
  return res.data as ApiListResponse<Partition[]>
}

export async function getPartition(id: number): Promise<ApiListResponse<{ partition: Partition; public_image_url?: string }>> {
  const res = await http.get(`/api/partitions/${id}`)
  return res.data as ApiListResponse<{ partition: Partition; public_image_url?: string }>
}
