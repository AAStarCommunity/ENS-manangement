import { dbConnect } from "@/database";
import { EnsDataModel } from '@/database/ens-data-model';

dbConnect();

export async function GET(request: Request) {
    // const { searchParams } = new URL(request.url)
    // const id = searchParams.get('id')
    // console.log(id);
    let res;
    try {
        res = await EnsDataModel.find({});
    } catch (e) {
        res = []
    }

    return Response.json({ data: res })
}