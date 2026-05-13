import { env } from '../lib/env'

export class ApiError extends Error {
  readonly status: number
  readonly body: unknown

  constructor(message: string, status: number, body: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const url = `${env.apiUrl}${path}`
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    let body: unknown
    try {
      body = await response.json()
    } catch {
      body = await response.text().catch(() => undefined)
    }
    throw new ApiError(
      `GET ${path} failed with status ${response.status}`,
      response.status,
      body,
    )
  }

  return (await response.json()) as T
}
