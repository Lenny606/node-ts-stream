# DATABASE MODEL

## OVERVIEW
The database uses **PostgreSQL** for scalable relational storage, managed via **Prisma ORM**. To handle high-bandwidth streaming and telemetry, the architecture incorporates **table partitioning** and **connection pooling via PgBouncer**.

## TABLES

### 1. `User`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | PK, UUID | Unique user identifier. |
| `email` | `String` | Unique, Not Null | User's login email. |
| `password`| `String` | Not Null | Hashed password. |
| `name` | `String` | Optional | User's display name. |
| `createdAt`| `DateTime`| Default `now()` | Registration timestamp. |

### 2. `Video`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | PK, UUID | Unique video identifier. |
| `title` | `String` | Not Null | Video title. |
| `description`| `String` | Not Null | Detailed description. |
| `thumbnail`| `String` | Not Null | URL/Path to the thumbnail image. |
| `videoUrl` | `String` | Not Null | URL/Path to the video file. |
| `duration` | `Int` | Not Null | Duration in seconds. |
| `categoryId`| `String` | FK | Reference to Category. |

### 3. `ViewLog` (New)
Event-based table to track views without locking the `Video` table.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | PK, UUID | Record identifier. |
| `videoId` | `String` | FK | The video watched. |
| `userId` | `String` | FK, Optional | The user who watched (if logged in). |
| `createdAt`| `DateTime`| Default `now()` | Time of the view. |

### 4. `WatchProgress`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | PK, UUID | Record identifier. |
| `userId` | `String` | FK | The user watching. |
| `videoId` | `String` | FK | The video being watched. |
| `progress` | `Int` | Not Null | Last timestamp in seconds. |
| `updatedAt`| `DateTime`| Default `now()` | Last watch time. |
| **Index** | `Composite` | `(userId, videoId)` | Fast lookups for resume-play. |

### 5. `PlaybackMetric` (New - Partitioned)
High-volume telemetry data for monitoring Quality of Experience (QoE).
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | PK, UUID | Record identifier. |
| `userId` | `String` | FK | The user. |
| `videoId` | `String` | FK | The video. |
| `bitrate` | `Int` | Not Null | Current streaming bitrate in kbps. |
| `bufferLevel`| `Float` | Not Null | Buffer health in seconds. |
| `eventType` | `Enum` | Not Null | `HEARTBEAT`, `BUFFERING`, `ERROR`. |
| `timestamp` | `DateTime` | PK (Part), Default `now()` | Event time (used for partitioning). |

---

## SCALABILITY FEATURES

### 1. Table Partitioning
The `PlaybackMetric` table uses **Range Partitioning** on the `timestamp` column.
- **Interval**: Daily partitions (e.g., `metrics_y2026_m05_d10`).
- **Benefit**: Keeps the active data set small and allows for efficient deletion of old logs (dropping a partition vs. `DELETE FROM`).
- **Note**: Handled via raw SQL migrations as Prisma does not natively manage partition creation.

### 2. Connection Pooling (PgBouncer)
To handle the high frequency of small writes (heartbeats) from thousands of concurrent clients:
- **Mode**: `Transaction` mode for maximum efficiency.
- **Configuration**: Prisma connection strings must append `?pgbouncer=true`.
- **Infrastructure**: PgBouncer sits between the Fastify backend and the PostgreSQL instance.

## RELATIONSHIPS
- **Category -> Videos**: One-to-Many.
- **User -> WatchProgress**: One-to-Many.
- **Video -> ViewLog**: One-to-Many.
- **User/Video -> PlaybackMetric**: One-to-Many.
