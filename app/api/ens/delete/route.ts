import { dbConnect } from "@/database";
import { EnsDataModel } from '@/database/ens-data-model';

dbConnect();

export async function POST(request: Request) {
    const body = await request.json();
    let res;

    try {
        res = await EnsDataModel.deleteOne({ _id: body.id })
    } catch (e) {
        res = 'error'
    }

    return Response.json({ data: res })
}