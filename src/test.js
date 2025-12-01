const prisma = require("./config/prismaconfig");

async function main() {
  const events = await prisma.event.findMany();
  console.log(events);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
