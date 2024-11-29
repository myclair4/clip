export async function onRequest(context) {
    const kvNamespace = context.env.VISITOR_DATA; // Pastikan nama namespace KV sudah benar
    const visitor = {
        ip: context.request.headers.get('cf-connecting-ip'),
        country: context.request.headers.get('cf-ipcountry'),
        url: context.request.url,
        timestamp: new Date().toISOString(),
    };

    // Membuat kunci unik untuk menyimpan data pengunjung
    const key = `visitor:${Date.now()}:${Math.random()}`;

    try {
        // Menyimpan data pengunjung ke dalam KV namespace
        await kvNamespace.put(key, JSON.stringify(visitor));

        // Mengembalikan response dengan status 200 tanpa body
        return new Response(null, { status: 200 });

    } catch (error) {
        // Menangani error jika ada masalah saat menyimpan
        console.error('Error saving visitor data:', error);
        return new Response(null, { status: 500 });
    }
}
