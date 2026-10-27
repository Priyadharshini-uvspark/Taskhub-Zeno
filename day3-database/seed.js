
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = [];

  // Create 5 users
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.create({
      data: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
      },
    });

    users.push(user);
  }

  const projects = [];

  // Create 3 projects
  for (let i = 1; i <= 3; i++) {
    const project = await prisma.project.create({
      data: {
        name: `Project ${i}`,
        ownerId: users[0].id,
      },
    });

    projects.push(project);
  }

  // Create 100 tasks
  for (let i = 1; i <= 100; i++) {
    await prisma.task.create({
      data: {
        title: `Task ${i}`,
        description: `Description for task ${i}`,
        status: i % 3 === 0 ? "completed" : "todo",
        priority: i % 2 === 0 ? "high" : "medium",
        projectId: projects[(i - 1) % 3].id,
        assigneeId: users[(i - 1) % 5].id,
      },
    });
  }

  console.log("Created 5 users, 3 projects, and 100 tasks.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
