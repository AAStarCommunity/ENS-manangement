
import { addEns, updateEns } from '@/lib/utils/query';

export async function POST(request: Request) {
    const body = await request.json();
    let res;

    try {
        if (body.id) {
            // update
            res = await updateEns(body)
        } else {
            res = await addEns(body)
        }
    } catch (e) {
        return Response.json({ status: "error", message: res })
    }

    return Response.json({ status: "ok" })
}