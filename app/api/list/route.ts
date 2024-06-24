import { getAll } from '@/lib/utils/query';

export const revalidate = 10;

export async function GET(request: Request) {
    let res;
    try {
        res = await getAll();
    } catch (e) {
        return Response.json({ status: 'error', message: e })
    }

    return Response.json(res)
}