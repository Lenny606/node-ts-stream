# UI CONTEXT

## APPEARANCE
- **Mode**: **Dark Mode** is the primary and only supported mode.
- **Style**: Cinematic, premium, and content-focused. High contrast between text and background.
- **Netflix Inspiration**: Dark backgrounds, vibrant red/indigo accents, and high-quality imagery.

## STYLING FRAMEWORK
- **Primary**: **Tailwind CSS v4**.
- **Icons**: **Lucide React**.

## COLOR THEME
The application uses a "Midnight" palette to ensure the video content remains the hero.

| Role | Hex Color | Tailwind Class | Description |
| :--- | :--- | :--- | :--- |
| **Background** | `#080808` | `bg-black` | Deep black for the main background. |
| **Surface** | `#121212` | `bg-zinc-900` | Cards, navbar, and elevated elements. |
| **Primary** | `#E50914` | `text-red-600` | Netflix Red for buttons and branding. |
| **Secondary** | `#6366F1` | `text-indigo-500` | Accents for progress bars and badges. |
| **Text Primary** | `#FFFFFF` | `text-white` | Main headings and labels. |
| **Text Secondary**| `#A1A1AA` | `text-zinc-400` | Metadata and secondary descriptions. |
| **Border** | `#27272A` | `border-zinc-800` | Subtle dividers. |

## DESIGN TOKENS
- **Typography**: **Inter** (Sans-serif) for clean readability.
- **Radius**:
    - `rounded-md` (0.375rem) for video cards (Netflix style is sharper).
    - `rounded-full` for user avatars and circle buttons.
- **Animations**:
    - **Hover Scale**: Video cards should scale up on hover (e.g., `hover:scale-105`).
    - **Transitions**: 300ms ease-in-out for all interactions.
- **Gradients**: Subtle top-to-bottom black gradients on the Hero section to ensure text readability.

## COMPONENTS
- **Navbar**: Sticky, transparent-to-solid black on scroll.
- **Hero**: Large cinematic display with "Play" and "More Info" buttons.
- **Video Row**: Horizontal scrollable list with title.
- **Player**: Minimalist overlay with custom controls.

