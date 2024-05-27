import { dbConnect } from "@/database";
import { EnsDataModel } from '@/database/ens-data-model';

dbConnect();

export async function POST(request: Request) {
    const body = await request.json();
    let res;

    try {
        if (body.id) {
            // update
            res = await EnsDataModel.findByIdAndUpdate(body.id, body)
        } else {
            const ensData = new EnsDataModel(body)
            res = await ensData.save({});
        }
    } catch (e) {
        res = []
    }

    return Response.json({ data: "ok" })
}