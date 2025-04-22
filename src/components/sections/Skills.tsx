import { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';

interface Skill {
  name: string;
  level: number;
  icon: string;
  color: string;
}

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progressValues, setProgressValues] = useState<{ [key: string]: number }>({});

  const contentSpring = useSpring({
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
    config: { tension: 80, friction: 20 },
    delay: 200
  });

  const frontendSkills: Skill[] = [
    { name: 'HTML/CSS', level: 99, icon: '💻', color: 'hsl(var(--chart-1))' },
    { name: 'JavaScript', level: 90, icon: '⚡', color: 'hsl(var(--chart-2))' },
    { name: 'React', level: 85, icon: '⚛️', color: 'hsl(var(--chart-3))' },
    { name: 'TypeScript', level: 70, icon: '📘', color: 'hsl(var(--chart-4))' },
    { name: 'Tailwind CSS', level: 97, icon: '🎨', color: 'hsl(var(--chart-5))' },
    { name: 'Vue.js', level: 30, icon: '🟢', color: 'hsl(var(--chart-1))' },
  ];

  const designSkills: Skill[] = [
    { name: 'UI Design', level: 90, icon: '🎯', color: 'hsl(var(--chart-5))' },
    { name: 'Figma', level: 80, icon: '🔍', color: 'hsl(var(--chart-4))' },
    { name: 'Adobe XD', level: 40, icon: '📱', color: 'hsl(var(--chart-3))' },
    { name: 'Photoshop', level: 50, icon: '🖼️', color: 'hsl(var(--chart-2))' },
    { name: 'Illustration', level: 45, icon: '✏️', color: 'hsl(var(--chart-1))' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const allSkills = [...frontendSkills, ...designSkills];

            allSkills.forEach((skill) => {
              let currentValue = 0;
              const interval = setInterval(() => {
                currentValue += 1;
                setProgressValues(prev => ({
                  ...prev,
                  [skill.name]: currentValue
                }));
                if (currentValue >= skill.level) clearInterval(interval);
              }, 15);
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) observer.observe(currentContainer);

    return () => {
      if (currentContainer) observer.unobserve(currentContainer);
    };
  }, []);

  const SkillCard = ({ skill }: { skill: Skill }) => {
    const [props, set] = useSpring(() => ({
      scale: 1,
      shadow: 0,
      config: { tension: 300, friction: 20 }
    }));

    return (
      <animated.div
        style={{
          transform: props.scale.to(s => `scale(${s})`),
          boxShadow: props.shadow.to(s => `0 ${s * 8}px ${s * 16}px -4px rgba(0, 0, 0, 0.1)`)
        }}
        className="bg-card border border-border rounded-lg p-6"
        onMouseEnter={() => set({ scale: 1.03, shadow: 1 })}
        onMouseLeave={() => set({ scale: 1, shadow: 0 })}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{skill.icon}</span>
            <h3 className="font-medium">{skill.name}</h3>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Proficiency</span>
              <span className="text-sm font-medium">{progressValues[skill.name] || 0}%</span>
            </div>

            <div className="w-full h-2 bg-muted rounded overflow-hidden">
              <div
                className="h-full rounded transition-all duration-300"
                style={{
                  width: `${progressValues[skill.name] || 0}%`,
                  backgroundColor: skill.color,
                }}
              />
            </div>
          </div>
        </div>
      </animated.div>
    );
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="flex flex-col items-center mb-16">
          <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            My Skills
          </span>
          <h2 className="text-4xl font-bold text-center mb-4">Technical Expertise</h2>
          <div className="h-1 w-16 bg-primary rounded"></div>
        </div>

        <animated.div style={contentSpring}>
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8">Frontend Development</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {frontendSkills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8">Design</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designSkills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        </animated.div>
      </div>
    </section>
  );
};

export default Skills;
