# VIDEO STREAMING PLATFORM (NETFLIX CLONE)

## OVERVIEW
A high-performance video streaming service designed to provide a premium user experience similar to Netflix. The project focuses on efficient video delivery, modern UI aesthetics, and a scalable architecture.

## GOALS
- **Seamless Streaming**: Implement efficient video delivery with support for seeking (Range headers) and future HLS/DASH integration.
- **Netflix Experience**: Deliver a premium, high-end user interface with dark mode, horizontal rows, and a cinematic hero section.
- **Scalable Foundation**: Build a type-safe, monorepo-based architecture ready for production growth.
- **Discovery**: Ensure users can easily find and browse content through intelligent categorization and search.

## SCOPE
### In Scope
- **Video Playback**: High-quality streaming with a custom player.
- **Content Browsing**: Netflix-style rows (Trending, Originals, Genres).
- **Video Metadata**: Detailed information (title, description, duration, thumbnail).
- **User Watch Progress**: Track where users left off in a video.
- **Responsive Design**: Optimized for desktop, tablet, and mobile.

### Out of Scope (for MVP)
- **Real-time Encoding**: We will use pre-encoded files for now.
- **DRM**: Digital Rights Management is not part of the initial MVP.
- **Payment Integration**: Subscription management will be added in later phases.

## SUCCESS CRITERIA
- **Latency**: Video playback starts in under 2 seconds on local network.
- **UX**: 100% adherence to the Netflix-inspired design system.
- **Type Safety**: Zero `any` types in the codebase, shared types between client and server.

## CORE USER FLOW
1. **Landing**: User arrives and sees a cinematic hero video/image and content rows.
2. **Browsing**: User scrolls through categories, hovers over cards for previews.
3. **Playback**: User clicks a video, the player opens, and streaming starts immediately.
4. **History**: User can resume a video from where they left off.

## TECH STACK
- **Backend**: Node.js + Fastify + TypeScript (Performance optimized).
- **Frontend**: React 19 + Vite + TypeScript (Modern UI).
- **Styling**: Tailwind CSS v4 (Modern utility-first).
- **Database**: PostgreSQL + Prisma (Scalable relational storage).
- **Storage**: Local filesystem for MVP, S3-compatible for production.

## DESIGN PRINCIPLES
- **Cinematic Experience**: Dark theme by default, high-quality thumbnails.
- **Fluid Motion**: Smooth transitions, hover scaling, and lazy loading.
- **Visual Hierarchy**: Clear focus on content with minimal interface clutter.