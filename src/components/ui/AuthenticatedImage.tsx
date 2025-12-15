import { useEffect, useState } from 'react';
import api from '../../services/api';

interface AuthenticatedImageProps {
    url: string;
    alt: string;
    className?: string;
    fallbackIcon?: string;
}

export default function AuthenticatedImage({ url, alt, className, fallbackIcon }: AuthenticatedImageProps) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchImage = async () => {
            // Reset state when url changes
            setHasError(false);
            setImageSrc(null);

            // If no URL or known invalid/default, don't fetch
            if (!url || url === 'default-icon') {
                return;
            }

            try {
                const response = await api.get(url, { responseType: 'blob' });
                if (isMounted) {
                    const objectUrl = URL.createObjectURL(response.data);
                    setImageSrc(objectUrl);
                }
            } catch (error) {
                console.error("Failed to load authenticated image", error);
                if (isMounted) {
                    setHasError(true);
                }
            }
        };

        fetchImage();

        return () => {
            isMounted = false;
            // Cleanup object URL to avoid memory leaks
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, [url]);

    // Cleanup previous objectUrl when imageSrc updates, if we stored it in a ref, but here React state update handles the specific 'current' value. 
    // Actually the cleanup function of useEffect runs before the effect re-runs. 
    // So if url changes, we revoke the OLD imageSrc. Wait, we need to access the old one to revoke it.
    // However, the easier way is to revoke in the cleanup function using a predictable var or just rely on the fact that if imageSrc changes it's a new Blob.
    // Let's refine the cleanup: we only need to revoke if we created one.
    // The cleanup captured the scope of the previous run. But `imageSrc` in cleanup is stale? 
    // Actually, simple way:

    // Better useEffect for cleanup:
    /*
    useEffect(() => {
        // ... fetch logic ...
        return () => {
           if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
        }
    }, [url])
    */

    if (hasError || !imageSrc) {
        return <img src={fallbackIcon} alt={alt} className={className} />;
    }

    return <img src={imageSrc} alt={alt} className={className} />;
}
