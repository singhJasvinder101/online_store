import { useEffect, useState } from "react";

export default function UseProfile() {
    const [data, setData] = useState(false);
    const [adminInfoLoading, setAdminInfoLoading] = useState(true)

    useEffect(() => {
        setAdminInfoLoading(true)
        fetch('/api/profile')
            .then(response =>
                response.json())
            .then(data => {
                setData(data);
                setAdminInfoLoading(false)
            })
    }, [])

    return { data, adminInfoLoading }
}
