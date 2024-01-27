export async function fetcher (url: RequestInfo | URL): Promise<Response> {
  const res = await fetch(url);
  if (!res.ok) {
    const resJSON = await res.json();
    console.error(resJSON.error, res.status);
    throw new Error('Failed to fetch data');
  }
  return await res.json();
}
