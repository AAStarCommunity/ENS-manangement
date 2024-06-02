import { getAll } from '@/lib/utils/query';

export async function GET(request: Request) {
    let res;
    try {
        res = await getAll();
    } catch (e) {
        res = []
    }

    return Response.json(res)
}