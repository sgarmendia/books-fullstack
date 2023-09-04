const { PROD: IS_PROD } = import.meta.env;
export const BASE_URL = IS_PROD ? "/api" : "http://localhost:4000";
