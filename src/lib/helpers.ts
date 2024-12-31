function generateStoreSlug(
  storeName: string,
  cityName: string,
  shortName: string
): string {
  return `${storeName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${cityName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}-${shortName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;
}
