import css from './not-found.module.css'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "404 - Page Not Found | Note Hub",
    description: "The page you're looking for doesn't exist or may have been moved. Return to the homepage or explore other notes.",
    openGraph: {
        title: "404 - Page Not Found | Note Hub",
        description: "The page you're looking for doesn't exist or may have been moved. Return to the homepage or explore other notes.",
        url: "https://08-zustand-eypfyygwr-yelyzaveta-musianovychs-projects.vercel.app/404",
        images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "404 - Page Not Found | Note Hub",
        },
      ],
    }
}

const NotFound = () => {
    return (
        <div>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </div>
    )
}

export default NotFound;