export const onRequest = async (context) => {
    const url = new URL(context.request.url);

    // Daftar rute yang ingin diproses
    const allowedRoutes = ["/home", "/index"];

    // Cek apakah rute termasuk dalam daftar yang diizinkan
    if (allowedRoutes.includes(url.pathname)) {
        const kvNamespace = context.env.VISITOR_DATA;

        const visitor = {
            ip: context.request.headers.get('cf-connecting-ip'),
            country: context.request.headers.get('cf-ipcountry'),
            url: url.href,
            timestamp: new Date().toISOString(),
        };

        // Simpan data ke KV
        const key = `visitor:${Date.now()}:${Math.random()}`;
        await kvNamespace.put(key, JSON.stringify(visitor));

        console.log("Data pengunjung disimpan:", visitor);
    }

    // Teruskan permintaan ke resource asli
    return context.next();
};
