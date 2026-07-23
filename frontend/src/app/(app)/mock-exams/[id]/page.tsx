import { MockExamSessionPage } from "@/features/mock-exams/components/MockExamSessionPage";

interface MockExamPageProps {
  params: Promise<{ id: string }>;
}

export default async function MockExamPage({ params }: MockExamPageProps) {
  const { id } = await params;

  return <MockExamSessionPage examId={id} />;
}
