import { PrismaClient, Status } from "@/lib/generated/prisma";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomPhoneNumber(): string {
    const length = faker.number.int({ min: 9, max: 12 });
    const randomDigits = faker.string.numeric(length);
    return `08${randomDigits}`;
}

async function main() {
    const totalUsers = 19;
    const mealPlans = ["Diet Plan", "Protein Plan", "Royal Plan"];
    const mealTypes = ["bre", "lun", "din"];
    const deliveryDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    const status: Status[] = [Status.ACTIVE, Status.PAUSED, Status.CANCELLED];
    const hashedPassword = await bcrypt.hash("C0mpfe$t", 10);

    await prisma.user.create({
        data: {
            username: "sleightlyodd",
            fullName: "Hans Wijaya",
            phoneNumber: "087710293847",
            password: hashedPassword,
            createdAt: new Date("2025-06-07"),
        }
    });

    for (let i = 0; i < totalUsers; i++) {
        const rawUsername = faker.internet.displayName().toLowerCase();
        const username = rawUsername.replace(/[^a-z0-9._]/g, "").replace(/^[._]+|[._]+$/g, "");
        const user = await prisma.user.create({
            data: {
                username: username,
                fullName: faker.person.fullName(),
                phoneNumber: randomPhoneNumber(),
                password: hashedPassword,
                createdAt: randomDate(new Date("2025-05-01"), new Date()),
            }
        });

        const mealPlan = faker.helpers.arrayElement(mealPlans);
        const allergies = faker.helpers.arrayElement([null, "Nuts", "Dairy", "Gluten", "Soy", "Eggs", "Shellfish", "None"]);
        const mealType = faker.helpers.arrayElements(mealTypes, { min: 1, max: 3 });
        const deliveryDaysSelected = faker.helpers.arrayElements(deliveryDays, { min: 1, max: 7 });
        const subscriptionStatus = faker.helpers.arrayElement(status);
        const createdAt = randomDate(new Date(user.createdAt), new Date());
        const cancelledAt = subscriptionStatus === Status.CANCELLED ? randomDate(new Date(createdAt), new Date()) : null;
        const reactivatedAt = (cancelledAt && subscriptionStatus === Status.ACTIVE) ? randomDate(cancelledAt, new Date()) : null;
        const planPrice: Record<string, number> = {
            "Diet Plan": 30000,
            "Protein Plan": 40000,
            "Royal Plan": 60000,
        };
        const price = planPrice[mealPlan] * mealType.length * deliveryDaysSelected.length * 4.3;

        await prisma.subscription.create({
            data: {
                userId: user.id,
                mealPlan: mealPlan,
                allergies: allergies,
                createdAt: createdAt,
                price: price,
                mealType: mealType,
                deliveryDays: deliveryDaysSelected,
                status: subscriptionStatus,
                cancelledAt: cancelledAt,
                reactivatedAt: reactivatedAt,
            }
        });

        if (Math.random() < 0.5) {
            continue;
        }

        const messages = [
            "Absolutely love the meals! They're tasty, healthy, and always arrive on time.",
            "I never thought healthy eating could be this convenient. SEA Catering makes it easy.",
            "Portion sizes are perfect, and the ingredients are always fresh.",
            "My energy levels have gone up since I started the Protein Plan!",
            "As someone with allergies, I appreciate the customizable options.",
            "It fits perfectly into my busy schedule. No more unhealthy takeout!",
            "Honestly, SEA Catering is the best thing that happened to my diet this year.",
            "Affordable and delicious—what more could you ask for?",
            "The Royal Plan is so luxurious, I feel like I’m eating in a restaurant every day.",
            "Great variety, excellent customer service, and timely delivery!",
            "Been using it for two months now and already seeing health improvements.",
            "Their meals helped me stay consistent with my fitness goals.",
            "I tried it out of curiosity and now I’m hooked!",
            "My kids even love the meals. Huge win for busy parents!",
            "Everything is clearly labeled with nutritional info. Super helpful!",
            "I love that I can skip or pause my subscription anytime.",
            "It’s not just food, it’s a lifestyle upgrade.",
            "I switched from another service and SEA Catering is miles better.",
            "The meals are flavorful and the portions are just right. Highly recommend!"
        ]

        await prisma.testimonial.create({
            data: {
                customerName: user.fullName,
                rating: faker.number.int({ min: 4, max: 5 }),
                createdAt: randomDate(new Date(createdAt), new Date()),
                message: faker.helpers.arrayElement(messages),
            }
        });
    }
}

main()
    .then(() => {
        console.log("Seeding completed successfully.");
    })
    .catch((error) => {
        console.error("Error during seeding:", error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });