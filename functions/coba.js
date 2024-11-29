export async function onRequest(context) {
    const kvNamespace = context.env.VISITOR_DATA; //
    const visitor = {
        ip: context.request.headers.get('cf-connecting-ip'),
        country: context.request.headers.get('cf-ipcountry'),
        url: context.request.url,
        timestamp: new Date().toISOString(),
    };

    // 
    const key = `visitor:${Date.now()}:${Math.random()}`;
    await kvNamespace.put(key, JSON.stringify(visitor));

    console.log("ok save:", visitor);

    // 
    return new Response('ok save!', { status: 200 });
}
