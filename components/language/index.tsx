'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { BsGlobe } from 'react-icons/bs';

const LanguageSwitcher = ({ message }: { message?: string }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const initialLocale = searchParams.get('locale') || 'vi';
    const [locale, setLocale] = useState(initialLocale);

    useEffect(() => {
        const newSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
        newSearchParams.set('locale', locale);
        const newPath = `${pathname}?${newSearchParams.toString()}`;
        router.push(newPath);
    }, [locale, pathname, router, searchParams]);

    const handleLanguageSwitch = () => {
        setLocale(prevLocale => (prevLocale === 'en' ? 'vi' : 'en'));
    };

    return (
        <button onClick={handleLanguageSwitch}>
            <BsGlobe className={message ? message : `h-4 w-4 text-gray-600 dark:text-white`} />
        </button>
    );
};

export default LanguageSwitcher;
