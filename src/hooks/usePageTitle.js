import { useEffect } from 'react';

const BASE = 'Vaibhav Bansal';

export default function usePageTitle(page) {
    useEffect(() => {
        document.title = page ? `${page} | ${BASE}` : `${BASE} — AI Software Engineer`;
        return () => {
            document.title = `${BASE} — AI Software Engineer`;
        };
    }, [page]);
}
