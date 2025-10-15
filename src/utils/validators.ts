export const isValidSearchQuery = (query: string) => {
  return query.trim().length > 0;
};

export const isValidPlaceId = (placeId: string) => {
  return Boolean(placeId && placeId.trim().length > 0);
};

export const sanitizeSearchQuery = (query: string) => {
  return query.trim().replace(/\s+/g, ' ');
};