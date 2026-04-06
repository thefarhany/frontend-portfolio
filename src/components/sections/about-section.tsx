import { Card, CardContent } from "@/components/ui/card";
import { Code, Layout, Database, Wrench } from "lucide-react";

export function AboutSection() {
  const skills = [
    {
      title: "Frontend",
      description: "Next.js, React.js, Angular.js",
      icon: <Code className="h-6 w-6 text-neural-600" />,
    },
    {
      title: "UI/UX",
      description: "Prototype, Design System",
      icon: <Layout className="h-6 w-6 text-neural-600" />,
    },
    {
      title: "Backend",
      description: "Spring Boot, Laravel, FastAPI",
      icon: <Database className="h-6 w-6 text-neural-600" />,
    },
    {
      title: "Tools",
      description: "Git, Android Studio, Visual Studio Code",
      icon: <Wrench className="h-6 w-6 text-neural-600" />,
    },
  ];

  return (
    <section className="container mx-auto px-4 md:px-20 py-10 lg:py-20 flex flex-col items-center justify-center text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
        About Me
      </h2>
      <p className="text-neutral-600 max-w-2xl mx-auto mb-12">
        A passionate developer with 5+ years of experience building modern web
        applications. I specialize in creating intuitive interfaces and scalable
        solutions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {skills.map((skill, index) => (
          <Card
            key={index}
            className="border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6 flex flex-col items-start text-left">
              <div className="p-3 bg-neutral-50 rounded-lg mb-4">
                {skill.icon}
              </div>
              <h3 className="font-bold text-lg text-neutral-900 mb-2">
                {skill.title}
              </h3>
              <p className="text-sm text-neutral-600">{skill.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
