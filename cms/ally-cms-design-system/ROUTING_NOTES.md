# URL Routing & Path Strategy

## Current Issue
AllyCMS admin and login pages currently share the same domain path (cms.digitalallies.net), making it unclear which URL serves login vs. the admin dashboard. This will cause UX and security issues.

## Recommended Structure

**Login page:**
```
cms.digitalallies.net/login
```

**Admin dashboard (after auth):**
```
cms.digitalallies.net/admin
  - /admin/pages
  - /admin/dashboard
  - /admin/settings
  - /admin/collections (future)
```

**Public-facing site:**
```
cms.digitalallies.net/
  - / (homepage)
  - /pages/:slug
  - /collections/:name
```

## Next Steps
1. Define authentication middleware to redirect unauthenticated users to `/login`
2. Protect `/admin/*` routes with session/token verification
3. Set up POST `/login` endpoint for credential validation
4. Implement logout that clears session and redirects to `/login`
5. Consider subdomain separation if managing multiple client sites (e.g., `client-name.cms.digitalallies.net`)

## Notes
- The mobile CMS admin UI assumes the user is already authenticated (no login flow on mobile)
- Desktop login page is now available as a separate entry point
- Consider CSRF tokens for login form security
