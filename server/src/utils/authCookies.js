const tokenCookieName = "jobPortalToken";

export const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return req.cookies?.[tokenCookieName];
};

export const setAuthCookie = (res, token) => {
  res.cookie(tokenCookieName, token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
};

export const clearAuthCookie = (res) => {
  res.clearCookie(tokenCookieName, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
};
