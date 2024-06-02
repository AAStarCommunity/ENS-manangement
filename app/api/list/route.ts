import { getAll } from '@/lib/utils/query';

export async function GET(request: Request) {
    // const { searchParams } = new URL(request.url)
    // const id = searchParams.get('id')
    // console.log(id);

    let res;
    try {
        res = await getAll();
        console.log(res);

    } catch (e) {
        res = []
    }

    return Response.json(res)
}