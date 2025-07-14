"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  tags: string[];
  date: string;
  link: string;
}

interface PortfolioProps {
  projects: Project[];
}

export const Portfolio = ({ projects }: PortfolioProps) => {
  const controls = useAnimation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Get all unique tags from projects
  const allTags = ["All", ...Array.from(new Set(projects.flatMap(project => project.tags)))];

  // Filter projects based on selected tag
  useEffect(() => {
    if (selectedTag === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.tags.includes(selectedTag)));
    }
  }, [selectedTag, projects]);

  // Sort projects chronologically (most recent first)
  const sortedProjects = [...filteredProjects].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="relative overflow-hidden w-full min-h-screen bg-[#2cc295] px-6 sm:px-12 pt-6 pb-18">
      {/* Header */}
      <div className="mb-16">
        <h1 
          className="text-[#06302b] text-6xl md:text-7xl lg:text-9xl font-bold uppercase tracking-wide mb-4"
          style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
        >
          Portfolio
        </h1>
        <p className="text-[#095544] text-xl md:text-3xl font-medium font-nimbus leading-relaxed max-w-3xl">
          A collection of my work spanning applications, research, branding, and games. 
          Each project tells a story of creativity and technical exploration.
        </p>
      </div>

      {/* Filter Tags */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-4">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-6 py-3 rounded-full font-bold uppercase tracking-wide transition-all duration-300 ${
                selectedTag === tag
                  ? "bg-[#06302b] text-[#2cc295]"
                  : "bg-transparent text-[#06302b] border-2 border-[#06302b] hover:bg-[#06302b] hover:text-[#2cc295]"
              }`}
              style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {sortedProjects.map((project) => (
          <motion.div
            key={project.id}
            className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer group hover:bg-white/20 transition-all duration-300"
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 
                  className="text-[#06302b] text-2xl font-bold uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
                >
                  {project.title}
                </h3>
                <span className="text-[#095544] text-sm font-medium">
                  {formatDate(project.date)}
                </span>
              </div>
              <p className="text-[#095544] text-sm mb-4 leading-relaxed">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#06302b] text-[#2cc295] text-xs font-bold uppercase tracking-wide rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-[#2cc295] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-[#06302b] text-[#2cc295] rounded-full flex items-center justify-center font-bold text-xl hover:bg-[#095544] transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 
                    className="text-[#06302b] text-4xl md:text-5xl font-bold uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
                  >
                    {selectedProject.title}
                  </h2>
                  <span className="text-[#095544] text-lg font-medium">
                    {formatDate(selectedProject.date)}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-[#06302b] text-[#2cc295] text-sm font-bold uppercase tracking-wide rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-[#095544] text-lg leading-relaxed mb-8">
                  {selectedProject.longDescription}
                </p>

                <div className="flex gap-4">
                  <Link
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-[#06302b] text-[#2cc295] font-bold uppercase tracking-wide rounded-full hover:bg-[#095544] transition-colors"
                    style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
                  >
                    View Project
                  </Link>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-8 py-3 border-2 border-[#06302b] text-[#06302b] font-bold uppercase tracking-wide rounded-full hover:bg-[#06302b] hover:text-[#2cc295] transition-colors"
                    style={{ fontFamily: "var(--font-nimbus-sans), sans-serif" }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};