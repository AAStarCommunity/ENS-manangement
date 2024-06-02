import { deleteEns } from '@/lib/utils/query';

export async function POST(request: Request) {
    const body = await request.json();
    let res;

    try {
        res = await deleteEns(body.id)
    } catch (e) {
        res = 'error'
    }

    return Response.json({ data: res })
}