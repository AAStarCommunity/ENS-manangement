import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    console.time("Seeding complete 🌱");

    await prisma.ens.createMany({
        skipDuplicates: true,
        data: [
            {
                node: "paymaster.eth",
                address: {
                    "60": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
                    "0": "0x76a91462e907b15cbf27d5425399ebf6f0fb50ebb88f1888ac",
                },
                text: {
                    email: 'admin@ethpaymaster.com'
                },
                contenthash: "0xe301017012204edd2984eeaf3ddf50bac238ec95c5713fb40b5e428b508fdbe55d3b9f155ffe"
            },
            {
                node: "test.paymaster.eth",
                address: {
                    "60": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
                    "0": "0xa914b48297bff5dadecc5f36145cec6a5f20d57c8f9b87",
                },
                text: {
                    email: 'test@ethpaymaster.com'
                },
                contenthash: "0xe301017012204edd2984eeaf3ddf50bac238ec95c5713fb40b5e428b508fdbe55d3b9f155ffe"
            },
        ],
    });

    console.timeEnd("Seeding complete 🌱");
};

main()
    .then(() => {
        console.log("Process completed");
    })
    .catch((e) => console.log(e));
