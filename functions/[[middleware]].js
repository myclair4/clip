export const onRequest = async (context) => {
    const url = new URL(context.request.url);

    // Daftar halaman yang akan diproses
    const allowedRoutes = ["/coba", "/coba2", "/index"];

    // Periksa apakah rute permintaan ada dalam daftar
    if (context.request.method === "GET" && allowedRoutes.includes(url.pathname)) {
        const kvNamespace = context.env.VISITOR_DATA; // KV Namespace untuk menyimpan data pengunjung

        // Data pengunjung yang akan disimpan
        const visitor = {
            ip: context.request.headers.get('cf-connecting-ip'),
            country: context.request.headers.get('cf-ipcountry'),
            url: url.href,
            timestamp: new Date().toISOString(),
        };

        // Membuat key unik untuk data pengunjung
        const key = `visitor:${Date.now()}:${Math.random()}`;

        // Simpan data ke KV
        await kvNamespace.put(key, JSON.stringify(visitor));

        console.log("Data pengunjung disimpan:", visitor);
    }

    // Teruskan permintaan ke halaman atau resource asli
    return context.next();
};
