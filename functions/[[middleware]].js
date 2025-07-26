export const onRequest = async (context) => {
    const url = new URL(context.request.url);

    // Daftar rute yang ingin diproses
    const allowedRoutes = ["/home", "/index", "/Esperanza"];

    if (allowedRoutes.includes(url.pathname)) {
        const visitor = {
            ip: context.request.headers.get('cf-connecting-ip'),
            country: context.request.headers.get('cf-ipcountry'),
            url: url.href,
            timestamp: new Date().toISOString(),
        };

        // Kirim data ke Worker milikmu
        await fetch("https://newrepot.masenyong66.workers.dev/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(visitor)
        });
    }

    // Lanjut ke halaman tujuan
    return context.next();
};
