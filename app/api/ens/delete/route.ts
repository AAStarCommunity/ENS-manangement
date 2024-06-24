import { deleteEns } from '@/lib/utils/query';

export async function POST(request: Request) {
    const body = await request.json();
    let res;

    try {
        res = await deleteEns(body.id)
    } catch (e) {
        return Response.json({ status: 'error', message: e })
    }

    return Response.json({ status: 'ok' })
}