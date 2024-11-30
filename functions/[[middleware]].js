export const onRequest = async (context) => {
    const kvNamespace = context.env.VISITOR_DATA;

    const visitor = {
        ip: context.request.headers.get('cf-connecting-ip'),
        country: context.request.headers.get('cf-ipcountry'),
        url: context.request.url,
        timestamp: new Date().toISOString(),
    };

    try {
        // Simpan data ke KV
        const key = `visitor:${Date.now()}:${Math.random()}`;
        await kvNamespace.put(key, JSON.stringify(visitor));

        console.log("Data pengunjung disimpan:", visitor);
    } catch (error) {
        console.error("Gagal menyimpan data pengunjung:", error);
    }

    // Lanjutkan permintaan ke halaman
    return context.next();
};
