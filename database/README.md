# Database Schema

## Setup

```bash
# Create a PostgreSQL database
createdb anime_tracker

# Run migrations
psql anime_tracker < init.sql
```

## Tables

- `users` - User accounts
- `anime` - Anime catalog (cached from AniList API)
- `user_favorites` - User's favorite anime
- `episodes` - Episode information
