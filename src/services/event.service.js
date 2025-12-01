const prisma = require("../config/prismaconfig");

class EventService {
  
  async createEvent(data) {
    return await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        output: data.output,
        images: {
          create: data.images || [],
        },
      },
      include: { images: true },
    });
  }

  async getAllEvents() {
    return await prisma.event.findMany({
      include: { images: true },
    });
  }

  async getEventById(id) {
    return await prisma.event.findUnique({
      where: { event_id: Number(id) },
      include: { images: true },
    });
  }
}

module.exports = new EventService();
