import PageHeader from "@/components/PageHeader";
import UploadWizard from "@/components/upload/UploadWizard";

export default function UploadPage() {
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <PageHeader
        title="Upload & Analisis CSV"
        subtitle="Analisis sentimen konten dari TikTok, Instagram, YouTube, dan Google News"
      />
      <main className="flex-1 p-8">
        <UploadWizard />
      </main>
    </div>
  );
}
