import { useEffect, useState } from "react";

export default function useLoadData<T>({ url } : { url: string }) {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(false);
                setError(null);

                const res = await fetch(url);
                if (!res.ok) throw new Error (`HTTP 에러: ${res.status}`);
                const data = await res.json();
                setData(data);
                
            } catch (error: any) {
                console.error("데이터 불러오기 실패:", error);
                setError(error);

            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [url])

    return { data, isLoading, error };
}