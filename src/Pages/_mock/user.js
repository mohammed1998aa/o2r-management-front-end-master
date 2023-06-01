import { faker } from "@faker-js/faker";
import { sample } from "lodash";

// ----------------------------------------------------------------------
const numbers = ["a", "b", "c", "4", "5"];

const user = numbers.map((char) => ({
  id: faker.datatype.uuid(),
  //avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: char,
  //company: faker.company.name(),
  //  isVerified: faker.datatype.boolean(),
  status: sample(["active", "banned"]),
  // role: sample([
  //   "Leader",
  //   "Hr Manager",
  //   "UI Designer",
  //   "UX Designer",
  //   "UI/UX Designer",
  //   "Project Manager",
  //   "Backend Developer",
  //   "Full Stack Designer",
  //   "Front End Developer",
  //   "Full Stack Developer",
  // ]),
}));

export default user;
