export async function nostaddress(name: string) {
  const res = await fetch(
    `https://nostrcheck.me/api/v1/nostraddress?name=${name}`
  );
  if (!res.ok) {
    return undefined;
  }

  const data = await res.json();
  return data.names[name];
}
