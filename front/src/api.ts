/* eslint-disable @typescript-eslint/no-explicit-any */
import store from '@/store'
const base = process.env.VUE_APP_API_BASE_URL
const protocol = process.env.VUE_APP_API_PROTOCOL
type ApiRequest = {
    method: string;
    path: string;
    data?: unknown;
};

type ApiHeaders = {
    'Content-Type'?: string;
    Authorization?: string;
};

type ApiOpts = { method: string; headers: ApiHeaders; body?: unknown };

export class APIError extends Error {
  public apiErrors: any;
  constructor (object: unknown) {
    super('APIError')
    this.apiErrors = object
  }
}

async function send ({ method, path, data }: ApiRequest): Promise<any> {
  const fetch = window.fetch
  const opts: ApiOpts = {
    method,
    headers: {}
  }

  opts.headers['Content-Type'] = 'application/json'
  const token = store.state.token
  console.log('tokenAPI', token)
  if (token && path !== 'rest-auth/') {
    opts.headers.Authorization = `Token ${token}`
  }

  opts.body = JSON.stringify(data)

  let url
  if (path.includes('http')) {
    if (protocol === 'https' && !path.includes('https')) {
      url = path.replace('http', 'https')
    } else {
      url = path
    }
  } else {
    url = `${protocol}://${base}/${path}`
  }
  console.log(opts, url)

  const r = await fetch(url, opts as RequestInit)
  if (!r.ok) {
    const text = await r.text()
    console.log('APIError', url, text)
    throw new APIError(JSON.parse(text))
  } else {
    if (method === 'DELETE') {
      console.log(r)
      console.log('text', await r.text())
      return true
    } else {
      return await r.json()
    }
  }
}

export function get (path: string): Promise<any> {
  return send({ method: 'GET', path })
}

export function del (path: string): Promise<any> {
  return send({ method: 'DELETE', path })
}

export function post (path: string, data: unknown): Promise<any> {
  return send({ method: 'POST', path, data })
}

export function put (path: string, data: unknown): Promise<any> {
  return send({ method: 'PUT', path, data })
}

export function patch (path: string, data: unknown): Promise<any> {
  return send({ method: 'PATCH', path, data })
}

export function getFullUrl (path: string): string {
  return `${protocol}://${base}/${path}`
}
