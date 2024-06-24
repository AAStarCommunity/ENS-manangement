import prisma from "@/lib/db";
import { Ens, EnsWithId } from "@/lib/types";

export const getAll = async () => {
    const start = Date.now();

    const result = await prisma.ens
        .findMany({
            // You can find the `cacheStrategy` options [here](https://www.prisma.io/docs/accelerate/caching#cache-strategies). The `cacheStrategy` can also be undefined, which would mean only connection pooling is being used.
            orderBy: {
                id: "asc",
            },
        })
        .withAccelerateInfo();

    return {
        data: result?.data,
        time: Date.now() - start,
    };
};

export const addEns = async (ens: Ens) => {
    return await prisma.ens.create({
        data: {
            node: ens.node,
            address: ens.address,
            text: ens.text,
            contenthash: ens.contenthash,
        },
    });
};

export const updateEns = async (ens: EnsWithId) => {
    return await prisma.ens.update({
        where: {
            id: ens.id,
        },
        data: {
            ...ens,
        },
    });
}

export const deleteEns = async (id: number) => {
    return await prisma.ens.delete({
        where: {
            id: id,
        },
    });
}