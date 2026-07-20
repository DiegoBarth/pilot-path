import { Plane, Cloud, Scale, Compass } from "lucide-react";
import { SubjectCard } from "./SubjectCard";

const subjects = [
  {
    id: "1",
    title: "Introduction to Flight",
    icon: Plane,
    progress: 80,
    lessonsCompleted: 16,
    totalLessons: 20,
  },
  {
    id: "2",
    title: "Meteorology",
    icon: Cloud,
    progress: 45,
    lessonsCompleted: 9,
    totalLessons: 20,
  },
  {
    id: "3",
    title: "Aviation Law",
    icon: Scale,
    progress: 25,
    lessonsCompleted: 5,
    totalLessons: 20,
  },
  {
    id: "4",
    title: "Air Navigation",
    icon: Compass,
    progress: 60,
    lessonsCompleted: 12,
    totalLessons: 20,
  },
];

export function CurriculumGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {subjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          subject={subject}
        />
      ))}
    </div>
  );
}